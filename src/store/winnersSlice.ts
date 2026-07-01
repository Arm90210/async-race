import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as winnersApi from '../api/winnersApi';
import * as garageApi from '../api/garageApi';
import type { WinnerWithCar, SortField, SortOrder } from '../types';
import { WINNERS_PER_PAGE } from '../utils/constants';

interface WinnersState {
  winners: WinnerWithCar[];
  totalCount: number;
  currentPage: number;
  sortField: SortField;
  sortOrder: SortOrder;
  loading: boolean;
}

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
  currentPage: 1,
  sortField: 'wins',
  sortOrder: 'DESC',
  loading: false,
};

interface FetchParams {
  page?: number;
  sort?: SortField;
  order?: SortOrder;
}

export const fetchWinners = createAsyncThunk(
  'winners/fetch',
  async (params: FetchParams | undefined, { getState }) => {
    const state = getState() as { winners: WinnersState };
    const page = params?.page ?? state.winners.currentPage;
    const sort = params?.sort ?? state.winners.sortField;
    const order = params?.order ?? state.winners.sortOrder;

    const result = await winnersApi.getWinners({
      page,
      limit: WINNERS_PER_PAGE,
      sort,
      order,
    });

    // enrich winners with car data
    const enriched = await Promise.all(
      result.data.map(async (winner) => {
        try {
          const car = await garageApi.getCar(winner.id);
          return { ...winner, car };
        } catch {
          return { ...winner, car: undefined };
        }
      }),
    );

    return { winners: enriched, total: result.total, page, sort, order };
  },
);

export const saveWinner = createAsyncThunk(
  'winners/save',
  async ({ id, time }: { id: number; time: number }) => {
    try {
      const existing = await winnersApi.getWinner(id);
      await winnersApi.updateWinner(id, {
        wins: existing.wins + 1,
        time: Math.min(existing.time, time),
      });
    } catch {
      // 404 = first win
      await winnersApi.createWinner({ id, wins: 1, time });
    }
  },
);

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setWinnersPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.winners = action.payload.winners;
        state.totalCount = action.payload.total;
        state.currentPage = action.payload.page;
        state.sortField = action.payload.sort;
        state.sortOrder = action.payload.order;
        state.loading = false;
      })
      .addCase(fetchWinners.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setWinnersPage } = winnersSlice.actions;

export default winnersSlice.reducer;
