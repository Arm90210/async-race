import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as garageApi from '../api/garageApi';
import * as winnersApi from '../api/winnersApi';
import type { Car, CarInput } from '../types';
import { CARS_PER_PAGE, GENERATE_COUNT, BATCH_SIZE } from '../utils/constants';
import { randomCarName } from '../utils/carNames';
import { randomColor } from '../utils/colors';

interface GarageState {
  cars: Car[];
  totalCount: number;
  currentPage: number;
  selectedCar: Car | null;
  createName: string;
  createColor: string;
  updateName: string;
  updateColor: string;
  loading: boolean;
}

const initialState: GarageState = {
  cars: [],
  totalCount: 0,
  currentPage: 1,
  selectedCar: null,
  createName: '',
  createColor: '#ff0000',
  updateName: '',
  updateColor: '#ff0000',
  loading: false,
};

export const fetchGarage = createAsyncThunk(
  'garage/fetchPage',
  async (page: number) => {
    const result = await garageApi.getCars(page, CARS_PER_PAGE);
    return { cars: result.data, total: result.total, page };
  },
);

export const createCar = createAsyncThunk(
  'garage/createCar',
  async (input: CarInput, { dispatch, getState }) => {
    await garageApi.createCar(input);
    const state = getState() as { garage: GarageState };
    dispatch(fetchGarage(state.garage.currentPage));
  },
);

export const updateCarThunk = createAsyncThunk(
  'garage/updateCar',
  async ({ id, input }: { id: number; input: CarInput }, { dispatch, getState }) => {
    await garageApi.updateCar(id, input);
    const state = getState() as { garage: GarageState };
    dispatch(fetchGarage(state.garage.currentPage));
  },
);

export const deleteCarThunk = createAsyncThunk(
  'garage/deleteCar',
  async (id: number, { dispatch, getState }) => {
    await garageApi.deleteCar(id);
    // also remove from winners (silently fail if not there)
    try {
      await winnersApi.deleteWinner(id);
    } catch {
      // not a winner, that's fine
    }
    const state = getState() as { garage: GarageState };
    const { currentPage, cars } = state.garage;
    // if we deleted the last car on this page, go back
    const targetPage = cars.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
    dispatch(fetchGarage(targetPage));
  },
);

export const generateCars = createAsyncThunk('garage/generateCars', async (_, { dispatch, getState }) => {
  const carsToCreate: CarInput[] = [];
  for (let i = 0; i < GENERATE_COUNT; i += 1) {
    carsToCreate.push({ name: randomCarName(), color: randomColor() });
  }

  // batch to avoid overwhelming the server
  for (let i = 0; i < carsToCreate.length; i += BATCH_SIZE) {
    const batch = carsToCreate.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map((car) => garageApi.createCar(car)));
  }

  const state = getState() as { garage: GarageState };
  dispatch(fetchGarage(state.garage.currentPage));
});

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    selectCar(state, action: PayloadAction<Car>) {
      state.selectedCar = action.payload;
      state.updateName = action.payload.name;
      state.updateColor = action.payload.color;
    },
    clearSelectedCar(state) {
      state.selectedCar = null;
      state.updateName = '';
      state.updateColor = '#ff0000';
    },
    setCreateName(state, action: PayloadAction<string>) {
      state.createName = action.payload;
    },
    setCreateColor(state, action: PayloadAction<string>) {
      state.createColor = action.payload;
    },
    setUpdateName(state, action: PayloadAction<string>) {
      state.updateName = action.payload;
    },
    setUpdateColor(state, action: PayloadAction<string>) {
      state.updateColor = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGarage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGarage.fulfilled, (state, action) => {
        state.cars = action.payload.cars;
        state.totalCount = action.payload.total;
        state.currentPage = action.payload.page;
        state.loading = false;
      })
      .addCase(fetchGarage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  selectCar,
  clearSelectedCar,
  setCreateName,
  setCreateColor,
  setUpdateName,
  setUpdateColor,
  setCurrentPage,
} = garageSlice.actions;

export default garageSlice.reducer;
