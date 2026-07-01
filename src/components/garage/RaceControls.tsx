import Button from '../shared/Button';
import styles from './RaceControls.module.css';

interface RaceControlsProps {
  onRace: () => void;
  onReset: () => void;
  onGenerate: () => void;
  isRacing: boolean;
  raceFinished: boolean;
  generating: boolean;
}

function RaceControls({
  onRace,
  onReset,
  onGenerate,
  isRacing,
  raceFinished,
  generating,
}: RaceControlsProps) {
  return (
    <div className={styles.controls}>
      <Button variant="primary" onClick={onRace} disabled={isRacing || raceFinished}>
        Race
      </Button>
      <Button onClick={onReset} disabled={!isRacing && !raceFinished}>
        Reset
      </Button>
      <Button variant="success" onClick={onGenerate} disabled={isRacing || raceFinished || generating}>
        {generating ? 'Generating...' : 'Generate Cars'}
      </Button>
    </div>
  );
}

export default RaceControls;
