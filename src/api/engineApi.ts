import { request } from './client';
import type { EngineResponse, DriveResult } from '../types';

export function startEngine(id: number): Promise<EngineResponse> {
  return request<EngineResponse>(`/engine?id=${id}&status=started`, {
    method: 'PATCH',
  });
}

export function stopEngine(id: number): Promise<EngineResponse> {
  return request<EngineResponse>(`/engine?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
}

// drive() catches 500 (engine broke) and returns { success: false }
export async function drive(id: number): Promise<DriveResult> {
  try {
    const result = await request<DriveResult>(`/engine?id=${id}&status=drive`, {
      method: 'PATCH',
    });
    return result;
  } catch {
    return { success: false };
  }
}
