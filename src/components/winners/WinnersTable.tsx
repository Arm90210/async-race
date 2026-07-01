import type { WinnerWithCar, SortField, SortOrder } from '../../types';
import CarIcon from '../garage/CarIcon';
import styles from './WinnersTable.module.css';

interface WinnersTableProps {
  winners: WinnerWithCar[];
  currentPage: number;
  itemsPerPage: number;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

function getSortIndicator(field: SortField, active: SortField, order: SortOrder): string {
  if (field !== active) return '';
  return order === 'ASC' ? ' ↑' : ' ↓';
}

function WinnersTable({
  winners,
  currentPage,
  itemsPerPage,
  sortField,
  sortOrder,
  onSort,
}: WinnersTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Car</th>
            <th>Name</th>
            <th className={styles.sortable} onClick={() => onSort('wins')}>
              Wins{getSortIndicator('wins', sortField, sortOrder)}
            </th>
            <th className={styles.sortable} onClick={() => onSort('time')}>
              Best Time (s){getSortIndicator('time', sortField, sortOrder)}
            </th>
          </tr>
        </thead>
        <tbody>
          {winners.map((w, i) => (
            <tr key={w.id}>
              <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
              <td>
                <CarIcon color={w.car?.color ?? '#888'} width={50} />
              </td>
              <td>{w.car?.name ?? 'Unknown'}</td>
              <td>{w.wins}</td>
              <td>{w.time.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WinnersTable;
