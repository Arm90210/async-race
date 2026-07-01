import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchWinners } from '../../store/winnersSlice';
import type { SortField } from '../../types';
import { WINNERS_PER_PAGE } from '../../utils/constants';
import WinnersTable from './WinnersTable';
import Pagination from '../shared/Pagination';
import styles from './WinnersPage.module.css';

function WinnersPage() {
  const dispatch = useAppDispatch();
  const { winners, totalCount, currentPage, sortField, sortOrder, loading } = useAppSelector(
    (s) => s.winners,
  );

  useEffect(() => {
    dispatch(fetchWinners(undefined));
  }, [dispatch]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(fetchWinners({ page }));
    },
    [dispatch],
  );

  const handleSort = useCallback(
    (field: SortField) => {
      const newOrder = field === sortField && sortOrder === 'ASC' ? 'DESC' : 'ASC';
      dispatch(fetchWinners({ sort: field, order: newOrder, page: 1 }));
    },
    [dispatch, sortField, sortOrder],
  );

  return (
    <div>
      <h2 className={styles.heading}>Winners ({totalCount})</h2>

      {loading && winners.length === 0 && <p className={styles.empty}>Loading...</p>}

      {!loading && winners.length === 0 && (
        <p className={styles.empty}>No winners yet. Go race some cars!</p>
      )}

      {winners.length > 0 && (
        <WinnersTable
          winners={winners}
          currentPage={currentPage}
          itemsPerPage={WINNERS_PER_PAGE}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalItems={totalCount}
        itemsPerPage={WINNERS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default WinnersPage;
