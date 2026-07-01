const BASE_URL = 'http://127.0.0.1:3000';

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  // some endpoints return empty body (204 or DELETE)
  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

export interface PaginatedResponse<T> {
  data: T;
  total: number;
}

export async function requestWithCount<T>(
  path: string,
  options?: RequestInit,
): Promise<PaginatedResponse<T>> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = (await response.json()) as T;
  const totalHeader = response.headers.get('X-Total-Count');
  const total = totalHeader ? parseInt(totalHeader, 10) : 0;

  return { data, total };
}
