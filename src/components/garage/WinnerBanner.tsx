import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { dismissBanner } from '../../store/raceSlice';
import styles from './WinnerBanner.module.css';

function WinnerBanner() {
  const dispatch = useAppDispatch();
  const { winner, bannerVisible } = useAppSelector((s) => s.race);

  if (!bannerVisible || !winner) return null;

  return (
    <div className={styles.overlay} onClick={() => dispatch(dismissBanner())}>
      <div className={styles.banner} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Winner!</h2>
        <p className={styles.name}>{winner.name}</p>
        <p className={styles.time}>{winner.time.toFixed(2)}s</p>
        <button
          type="button"
          className={styles.close}
          onClick={() => dispatch(dismissBanner())}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default WinnerBanner;
