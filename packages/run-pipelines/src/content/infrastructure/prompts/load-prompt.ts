import { loadPromptFromDir, renderPrompt } from '../../../llm/load-prompt';

export { renderPrompt };

export function loadPrompt(fileName: string): string {
  return loadPromptFromDir(__dirname, fileName);
}
