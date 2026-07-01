import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchGarage, generateCars } from '../../store/garageSlice';
import { CARS_PER_PAGE } from '../../utils/constants';
import { useRace } from '../../hooks/useRace';
import CarForm from './CarForm';
import RaceControls from './RaceControls';
import GarageCarTrack from './GarageCarTrack';
import WinnerBanner from './WinnerBanner';
import Pagination from '../shared/Pagination';
import styles from './GaragePage.module.css';

function GaragePage() {
  const dispatch = useAppDispatch();
  const { cars, totalCount, currentPage, loading } = useAppSelector((s) => s.garage);
  const { isRacing, winner, engineStates } = useAppSelector((s) => s.race);
  const [generating, setGenerating] = useState(false);
  const { startRace, resetAllCars, registerAnimation, unregisterAnimation } = useRace();

  useEffect(() => {
    dispatch(fetchGarage(currentPage));
    // only fetch on mount/remount — pagination handles subsequent fetches
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleRace = useCallback(() => {
    startRace(cars);
  }, [startRace, cars]);

  const handleReset = useCallback(() => {
    resetAllCars(cars);
  }, [resetAllCars, cars]);

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    await dispatch(generateCars());
    setGenerating(false);
  }, [dispatch]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (isRacing) return;
      dispatch(fetchGarage(page));
    },
    [dispatch, isRacing],
  );

  const hasEngineActivity = Object.keys(engineStates).length > 0;
  const raceFinished = !isRacing && (winner !== null || hasEngineActivity);

  return (
    <div>
      <CarForm disabled={isRacing || raceFinished} />
      <RaceControls
        onRace={handleRace}
        onReset={handleReset}
        onGenerate={handleGenerate}
        isRacing={isRacing}
        raceFinished={raceFinished}
        generating={generating}
      />

      <h2 className={styles.heading}>
        Garage ({totalCount})
      </h2>

      {loading && cars.length === 0 && <p className={styles.empty}>Loading...</p>}

      {!loading && cars.length === 0 && (
        <p className={styles.empty}>No cars in the garage. Create some!</p>
      )}

      {cars.map((car) => (
        <GarageCarTrack
          key={car.id}
          car={car}
          registerAnimation={registerAnimation}
          unregisterAnimation={unregisterAnimation}
        />
      ))}

      <Pagination
        currentPage={currentPage}
        totalItems={totalCount}
        itemsPerPage={CARS_PER_PAGE}
        onPageChange={handlePageChange}
        disabled={isRacing || raceFinished}
      />

      <WinnerBanner />
    </div>
  );
}

export default GaragePage;
