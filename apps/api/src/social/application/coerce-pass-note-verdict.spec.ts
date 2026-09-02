import {
  coercePassNoteVerdict,
  isPassOnlyIssue,
} from './coerce-pass-note-verdict';
import type { VerifierVerdict } from '../domain/social.types';

const PASS_ONLY_FROM_LIVE_C: string[] = [
  'idea_7a2c1b15-77d9-400c-8e91-919aa8fa9345: CTA «Umów 20 minut na wstępny zakres audytu» — poprawne mapowanie na cta.items[].label, ale hook «Twój zespół rośnie, a chaos operacyjny zjada czas? Po wdrożeniu rekomendacji z audytu klienci odzyskują średnio 6 godzin tygodniowo.» — brak problemu kontekstowego, pass.',
  'idea_bb58e5b4-57cb-4a02-bcee-fa6ffefb5ad3: hook «10 dni roboczych. Mapa wąskich gardeł. Jedna lista zamiast dwudziestu inicjatyw.» — «dwudziestu inicjatyw» to parafraza «dwudziestu równoległych inicjatyw» z offer.items[0].benefit, pass. CTA «Napisz do nas» mapuje się na cta.items[0].label, pass.',
  'idea_cdbaf918-314a-4193-b574-08cbc7b3ca67: CTA «Umów 20 minut na wstępny zakres audytu» — poprawne. Hook i description adresują profil audience (seed/seria A, chaos delivery), pass.',
  'idea_3b41b2f0-ab6e-46da-a313-664ec6bb4fed: hook «Dwadzieścia inicjatyw równolegle = zero efektu» — parafraza «dwudziestu równoległych inicjatyw» z kontekstu, pass. CTA «Napisz do nas» — poprawne.',
  'idea_ebe66e80-d559-46e2-ac6d-e935caa97073: hook «Szukasz kolejnego narzędzia? A może problem leży w procesach?» — ton zgodny z voice.weDo (konkret, język founderski), pass. CTA «Umów 20 minut na wstępny zakres audytu» — poprawne.',
];

describe('isPassOnlyIssue', () => {
  it('treats live C third-hop notes as pass-only', () => {
    expect(PASS_ONLY_FROM_LIVE_C.every(isPassOnlyIssue)).toBe(true);
  });

  it('does not treat a metric-reversal charge as pass-only', () => {
    expect(
      isPassOnlyIssue(
        'idea_7a2c1b15: hook «tracisz 6 godzin tygodniowo na chaos» — odwrócony sens metryki; JSON podaje 6 godzin odzyskane',
      ),
    ).toBe(false);
  });
});

describe('coercePassNoteVerdict', () => {
  it('leaves an ok verdict unchanged', () => {
    const verdict: VerifierVerdict = {
      ok: true,
      contextIssues: [],
      languageIssues: [],
    };
    expect(coercePassNoteVerdict(verdict)).toEqual({
      verdict,
      coerced: false,
    });
  });

  it('coerces ok:false when every issue is a pass note', () => {
    const verdict: VerifierVerdict = {
      ok: false,
      contextIssues: PASS_ONLY_FROM_LIVE_C,
      languageIssues: [],
    };
    expect(coercePassNoteVerdict(verdict)).toEqual({
      verdict: { ok: true, contextIssues: [], languageIssues: [] },
      coerced: true,
    });
  });

  it('keeps a real fail when any issue is not a pass note', () => {
    const passNote = PASS_ONLY_FROM_LIVE_C[0];
    if (passNote === undefined) {
      throw new Error('PASS_ONLY_FROM_LIVE_C must not be empty');
    }
    const verdict: VerifierVerdict = {
      ok: false,
      contextIssues: [
        passNote,
        'idea_x: «15 godzin» — liczba spoza JSON kontekstu',
      ],
      languageIssues: [],
    };
    expect(coercePassNoteVerdict(verdict)).toEqual({
      verdict,
      coerced: false,
    });
  });

  it('does not coerce ok:false with empty issue arrays', () => {
    const verdict: VerifierVerdict = {
      ok: false,
      contextIssues: [],
      languageIssues: [],
    };
    expect(coercePassNoteVerdict(verdict)).toEqual({
      verdict,
      coerced: false,
    });
  });
});
