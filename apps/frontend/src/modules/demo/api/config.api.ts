import { apiFetch } from '@/shared/api/api-fetch';
import { parseAppConfig, type AppConfig } from '@/modules/demo/api/config.types';

export async function fetchAppConfig(): Promise<AppConfig> {
  const body = await apiFetch('/config', { skipAuthRefresh: true });
  return parseAppConfig(body);
}
