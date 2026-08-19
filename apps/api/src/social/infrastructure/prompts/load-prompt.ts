import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function loadPrompt(fileName: string): string {
  return readFileSync(join(__dirname, fileName), 'utf-8');
}

export function renderPrompt(
  template: string,
  vars: Record<string, string>,
): string {
  return template.replace(
    /\{\{(\w+)\}\}/g,
    (_, key: string) => vars[key] ?? '',
  );
}
