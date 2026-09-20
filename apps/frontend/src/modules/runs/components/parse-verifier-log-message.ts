export type VerifierIssuesLog = {
  readonly kind: 'verifierIssues';
  readonly headline: string;
  readonly contextIssues: readonly string[];
  readonly languageIssues: readonly string[];
};

export type PlainLog = {
  readonly kind: 'plain';
  readonly text: string;
};

export type RunLogMessageView = VerifierIssuesLog | PlainLog;

const FAILED_PREFIX = 'ConsistencyVerifier failed. Context issues: ';
const FAILED_HEADLINE = 'ConsistencyVerifier failed.';
const COERCED_PREFIX =
  'ConsistencyVerifier returned ok:false with pass-only issue notes; treating as ok. Context issues: ';
const COERCED_HEADLINE =
  'ConsistencyVerifier returned ok:false with pass-only issue notes; treating as ok.';
const LANGUAGE_MARKER = '. Language issues: ';

const TEMPLATES = [
  { prefix: FAILED_PREFIX, headline: FAILED_HEADLINE },
  { prefix: COERCED_PREFIX, headline: COERCED_HEADLINE },
] as const;

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function scanJsonArrayEnd(source: string, start: number): number | null {
  if (source[start] !== '[') return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === '\\') {
        escaped = true;
        continue;
      }
      if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === '[') {
      depth += 1;
      continue;
    }
    if (char === ']') {
      depth -= 1;
      if (depth === 0) return index + 1;
    }
  }
  return null;
}

function parseStringArrayAt(
  source: string,
  start: number,
): { readonly items: readonly string[]; readonly end: number } | null {
  const end = scanJsonArrayEnd(source, start);
  if (end === null) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(source.slice(start, end));
  } catch {
    return null;
  }
  if (!isStringArray(parsed)) return null;
  return { items: parsed, end };
}

function parseVerifierIssuesSuffix(
  message: string,
  prefix: string,
  headline: string,
): VerifierIssuesLog | null {
  if (!message.startsWith(prefix)) return null;
  const context = parseStringArrayAt(message, prefix.length);
  if (context === null) return null;
  const afterContext = message.slice(context.end);
  if (!afterContext.startsWith(LANGUAGE_MARKER)) return null;
  const language = parseStringArrayAt(message, context.end + LANGUAGE_MARKER.length);
  if (language === null) return null;
  if (message.slice(language.end).trim() !== '') return null;
  return {
    kind: 'verifierIssues',
    headline,
    contextIssues: context.items,
    languageIssues: language.items,
  };
}

export function parseVerifierLogMessage(message: string): RunLogMessageView {
  for (const template of TEMPLATES) {
    const parsed = parseVerifierIssuesSuffix(message, template.prefix, template.headline);
    if (parsed !== null) return parsed;
  }
  return { kind: 'plain', text: message };
}
