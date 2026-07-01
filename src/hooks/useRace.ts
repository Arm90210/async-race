import { useRef, useCallback } from 'react';
import type { Car } from '../types';
import { useAppDispatch } from '../store/hooks';
import { setRacing, setEngineState, clearEngineState, setWinner, resetRace } from '../store/raceSlice';
import { saveWinner } from '../store/winnersSlice';
import * as engineApi from '../api/engineApi';

interface AnimationCallback {
  start: (durationMs: number) => void;
  stop: () => void;
  reset: () => void;
}

export function useRace() {
  const dispatch = useAppDispatch();
  const animationsRef = useRef<Map<number, AnimationCallback>>(new Map());
  const winnerDeclared = useRef(false);
  const raceStartTime = useRef(0);

  const registerAnimation = useCallback((carId: number, callbacks: AnimationCallback) => {
    animationsRef.current.set(carId, callbacks);
  }, []);

  const unregisterAnimation = useCallback((carId: number) => {
    animationsRef.current.delete(carId);
  }, []);

  const startRace = useCallback(
    async (cars: Car[]) => {
      winnerDeclared.current = false;
      raceStartTime.current = performance.now();
      dispatch(setRacing(true));

      const racePromises = cars.map(async (car) => {
        dispatch(setEngineState({ carId: car.id, status: 'starting' }));

        try {
          const { velocity, distance } = await engineApi.startEngine(car.id);
          dispatch(setEngineState({ carId: car.id, status: 'started', velocity, distance }));

          const durationMs = distance / velocity;
          animationsRef.current.get(car.id)?.start(durationMs);

          dispatch(setEngineState({ carId: car.id, status: 'driving' }));
          const result = await engineApi.drive(car.id);

          if (!result.success) {
            animationsRef.current.get(car.id)?.stop();
            dispatch(setEngineState({ carId: car.id, status: 'broken' }));
            return;
          }

          dispatch(setEngineState({ carId: car.id, status: 'finished' }));

          if (!winnerDeclared.current) {
            winnerDeclared.current = true;
            const elapsed = (performance.now() - raceStartTime.current) / 1000;
            const time = parseFloat(elapsed.toFixed(2));
            dispatch(setWinner({ carId: car.id, name: car.name, time }));
            dispatch(saveWinner({ id: car.id, time }));
          }
        } catch {
          dispatch(clearEngineState(car.id));
        }
      });

      await Promise.allSettled(racePromises);
      // race is over, allow reset
      dispatch(setRacing(false));
    },
    [dispatch],
  );

  const resetAllCars = useCallback(
    async (cars: Car[]) => {
      // stop all animations
      animationsRef.current.forEach((cb) => cb.reset());

      // stop all engines (best effort)
      await Promise.allSettled(
        cars.map((car) => engineApi.stopEngine(car.id).catch(() => {})),
      );

      dispatch(resetRace());
    },
    [dispatch],
  );

  return { startRace, resetAllCars, registerAnimation, unregisterAnimation };
}
