import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setCreateName,
  setCreateColor,
  setUpdateName,
  setUpdateColor,
  createCar,
  updateCarThunk,
  clearSelectedCar,
} from '../../store/garageSlice';
import { CAR_NAME_MAX_LENGTH } from '../../utils/constants';
import Button from '../shared/Button';
import styles from './CarForm.module.css';

interface CarFormProps {
  disabled?: boolean;
}

function CarForm({ disabled = false }: CarFormProps) {
  const dispatch = useAppDispatch();
  const { createName, createColor, updateName, updateColor, selectedCar } = useAppSelector(
    (s) => s.garage,
  );

  const handleCreate = () => {
    const trimmed = createName.trim();
    if (!trimmed || trimmed.length > CAR_NAME_MAX_LENGTH) return;
    dispatch(createCar({ name: trimmed, color: createColor }));
    dispatch(setCreateName(''));
  };

  const handleUpdate = () => {
    if (!selectedCar) return;
    const trimmed = updateName.trim();
    if (!trimmed || trimmed.length > CAR_NAME_MAX_LENGTH) return;
    dispatch(updateCarThunk({ id: selectedCar.id, input: { name: trimmed, color: updateColor } }));
    dispatch(clearSelectedCar());
  };

  return (
    <div className={styles.forms}>
      <div className={styles.row}>
        <input
          type="text"
          className={styles.input}
          placeholder="New car name"
          value={createName}
          maxLength={CAR_NAME_MAX_LENGTH}
          onChange={(e) => dispatch(setCreateName(e.target.value))}
          disabled={disabled}
        />
        <input
          type="color"
          className={styles.colorPicker}
          value={createColor}
          onChange={(e) => dispatch(setCreateColor(e.target.value))}
          disabled={disabled}
        />
        <Button
          variant="primary"
          onClick={handleCreate}
          disabled={disabled || !createName.trim()}
        >
          Create
        </Button>
      </div>

      <div className={styles.row}>
        <input
          type="text"
          className={styles.input}
          placeholder="Update car name"
          value={updateName}
          maxLength={CAR_NAME_MAX_LENGTH}
          onChange={(e) => dispatch(setUpdateName(e.target.value))}
          disabled={disabled || !selectedCar}
        />
        <input
          type="color"
          className={styles.colorPicker}
          value={updateColor}
          onChange={(e) => dispatch(setUpdateColor(e.target.value))}
          disabled={disabled || !selectedCar}
        />
        <Button
          variant="success"
          onClick={handleUpdate}
          disabled={disabled || !selectedCar || !updateName.trim()}
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export default CarForm;
