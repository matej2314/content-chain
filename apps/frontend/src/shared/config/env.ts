'use server';

export function getApiBaseUrl(): string {
  const value = process.env.API_BASE_URL;
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error('API_BASE_URL is not set');
  }
  return value.replace(/\/$/, '');
}
