import { request, requestWithCount } from './client';
import type { Winner, SortField, SortOrder } from '../types';
import type { PaginatedResponse } from './client';

interface GetWinnersParams {
  page: number;
  limit: number;
  sort: SortField;
  order: SortOrder;
}

export function getWinners(params: GetWinnersParams): Promise<PaginatedResponse<Winner[]>> {
  const { page, limit, sort, order } = params;
  const query = `_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`;
  return requestWithCount<Winner[]>(`/winners?${query}`);
}

export function getWinner(id: number): Promise<Winner> {
  return request<Winner>(`/winners/${id}`);
}

export function createWinner(body: Winner): Promise<Winner> {
  return request<Winner>('/winners', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function updateWinner(id: number, body: { wins: number; time: number }): Promise<Winner> {
  return request<Winner>(`/winners/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function deleteWinner(id: number): Promise<void> {
  return request<void>(`/winners/${id}`, { method: 'DELETE' });
}
