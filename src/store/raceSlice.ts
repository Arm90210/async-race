import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CarEngineState, EngineStatus } from '../types';

interface RaceWinner {
  carId: number;
  name: string;
  time: number;
}

interface RaceState {
  isRacing: boolean;
  engineStates: Record<number, CarEngineState>;
  winner: RaceWinner | null;
  bannerVisible: boolean;
}

const initialState: RaceState = {
  isRacing: false,
  engineStates: {},
  winner: null,
  bannerVisible: false,
};

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    setRacing(state, action: PayloadAction<boolean>) {
      state.isRacing = action.payload;
    },
    setEngineState(
      state,
      action: PayloadAction<{ carId: number; status: EngineStatus; velocity?: number; distance?: number }>,
    ) {
      const { carId, status, velocity, distance } = action.payload;
      state.engineStates[carId] = {
        status,
        velocity: velocity ?? state.engineStates[carId]?.velocity ?? 0,
        distance: distance ?? state.engineStates[carId]?.distance ?? 0,
      };
    },
    clearEngineState(state, action: PayloadAction<number>) {
      delete state.engineStates[action.payload];
    },
    setWinner(state, action: PayloadAction<RaceWinner>) {
      if (!state.winner) {
        state.winner = action.payload;
        state.bannerVisible = true;
      }
    },
    dismissBanner(state) {
      state.bannerVisible = false;
    },
    resetRace(state) {
      state.isRacing = false;
      state.engineStates = {};
      state.winner = null;
      state.bannerVisible = false;
    },
  },
});

export const {
  setRacing,
  setEngineState,
  clearEngineState,
  setWinner,
  dismissBanner,
  resetRace,
} = raceSlice.actions;

export default raceSlice.reducer;
