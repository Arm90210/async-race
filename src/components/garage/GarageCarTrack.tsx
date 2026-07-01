import { useEffect, useCallback } from 'react';
import type { Car } from '../../types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCar, deleteCarThunk } from '../../store/garageSlice';
import { setEngineState, clearEngineState } from '../../store/raceSlice';
import * as engineApi from '../../api/engineApi';
import { useCarAnimation } from '../../hooks/useCarAnimation';
import CarIcon from './CarIcon';
import Button from '../shared/Button';
import styles from './CarTrack.module.css';

interface GarageCarTrackProps {
  car: Car;
  registerAnimation: (carId: number, cbs: { start: (d: number) => void; stop: () => void; reset: () => void }) => void;
  unregisterAnimation: (carId: number) => void;
}

function GarageCarTrack({ car, registerAnimation, unregisterAnimation }: GarageCarTrackProps) {
  const dispatch = useAppDispatch();
  const isRacing = useAppSelector((s) => s.race.isRacing);
  const engineState = useAppSelector((s) => s.race.engineStates[car.id]);
  const { carRef, trackRef, start, stop, reset } = useCarAnimation();

  const isEngineOn = engineState && engineState.status !== 'idle';
  const isBusy = engineState?.status === 'driving' || engineState?.status === 'started' || engineState?.status === 'starting';

  // register this car's animation with the race system
  useEffect(() => {
    registerAnimation(car.id, { start, stop, reset });
    return () => unregisterAnimation(car.id);
  }, [car.id, registerAnimation, unregisterAnimation, start, stop, reset]);

  const handleStart = useCallback(async () => {
    dispatch(setEngineState({ carId: car.id, status: 'starting' }));
    try {
      const { velocity, distance } = await engineApi.startEngine(car.id);
      dispatch(setEngineState({ carId: car.id, status: 'started', velocity, distance }));
      const durationMs = distance / velocity;
      start(durationMs);
      dispatch(setEngineState({ carId: car.id, status: 'driving' }));
      const result = await engineApi.drive(car.id);
      if (!result.success) {
        stop();
        dispatch(setEngineState({ carId: car.id, status: 'broken' }));
      } else {
        dispatch(setEngineState({ carId: car.id, status: 'finished' }));
      }
    } catch {
      dispatch(clearEngineState(car.id));
    }
  }, [car.id, dispatch, start, stop]);

  const handleStop = useCallback(async () => {
    stop();
    reset();
    try {
      await engineApi.stopEngine(car.id);
    } catch {
      // ignore
    }
    dispatch(clearEngineState(car.id));
  }, [car.id, dispatch, stop, reset]);

  return (
    <div className={styles.carTrack}>
      <div className={styles.controls}>
        <Button size="sm" onClick={() => dispatch(selectCar(car))} disabled={isRacing}>
          Select
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => dispatch(deleteCarThunk(car.id))}
          disabled={isRacing || isBusy}
        >
          Remove
        </Button>
        <Button
          size="sm"
          variant="success"
          onClick={handleStart}
          disabled={isRacing || isEngineOn}
        >
          A
        </Button>
        <Button size="sm" onClick={handleStop} disabled={isRacing || !isEngineOn}>
          B
        </Button>
        <span className={styles.carName}>{car.name}</span>
      </div>
      <div className={styles.track} ref={trackRef}>
        <div className={styles.carWrapper} ref={carRef}>
          <CarIcon color={car.color} />
        </div>
        <div className={styles.finishLine} />
      </div>
    </div>
  );
}

export default GarageCarTrack;
