import { request, requestWithCount } from './client';
import type { Car, CarInput } from '../types';
import type { PaginatedResponse } from './client';

export function getCars(page: number, limit: number): Promise<PaginatedResponse<Car[]>> {
  return requestWithCount<Car[]>(`/garage?_page=${page}&_limit=${limit}`);
}

export function getCar(id: number): Promise<Car> {
  return request<Car>(`/garage/${id}`);
}

export function createCar(body: CarInput): Promise<Car> {
  return request<Car>('/garage', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function updateCar(id: number, body: CarInput): Promise<Car> {
  return request<Car>(`/garage/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function deleteCar(id: number): Promise<void> {
  return request<void>(`/garage/${id}`, { method: 'DELETE' });
}
