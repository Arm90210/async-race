export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface CarInput {
  name: string;
  color: string;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerWithCar extends Winner {
  car?: Car;
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export interface DriveResult {
  success: boolean;
}

export type EngineStatus = 'idle' | 'starting' | 'started' | 'driving' | 'broken' | 'finished';

export interface CarEngineState {
  status: EngineStatus;
  velocity: number;
  distance: number;
}

export type SortField = 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';
