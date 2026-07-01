import Button from './Button';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange, disabled = false }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  return (
    <div className={styles.pagination}>
      <Button size="sm" disabled={disabled || currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
        Prev
      </Button>
      <span className={styles.info}>
        Page {currentPage} / {totalPages}
      </span>
      <Button
        size="sm"
        disabled={disabled || currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
