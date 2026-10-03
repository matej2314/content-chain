import { apiFetch } from '@/shared/api/api-fetch';
import {
  isGatewayAlive,
  parseHealthReadyResponse,
  type HealthReadyResponse,
} from '@/modules/health/api/health.types';

export async function fetchHealthReady(): Promise<HealthReadyResponse> {
  const body = await apiFetch('/health/ready', { skipAuthRefresh: true });
  return parseHealthReadyResponse(body);
}

export async function fetchGatewayAlive(): Promise<boolean> {
  const ready = await fetchHealthReady();
  return isGatewayAlive(ready);
}
