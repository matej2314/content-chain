import {
  createAccountActivationId,
  createInvitationId,
} from '@content-chain/shared';
import { escapeHtml } from './escape-html';
import { renderTransactionalMail } from './render-transactional-mail';

const INVITE_URL =
  'https://app.example/invite/accept?token=tok_invite_raw_1';
const ACTIVATE_URL =
  'https://app.example/?activationToken=tok_activate_raw_1';
const VALIDITY = 'Link jest jednorazowy i wygasa po 7 dniach.';

describe('renderTransactionalMail', () => {
  it('renders PL invite mail with validity label and CTA url (URL-only raw)', () => {
    const rendered = renderTransactionalMail({
      kind: 'user_invited',
      to: 'member@example.com',
      invitationId: createInvitationId(
        'inv_11111111-1111-4111-8111-111111111111',
      ),
      acceptUrl: INVITE_URL,
      rawToken: 'tok_invite_raw_1',
      validityLabel: VALIDITY,
    });

    expect(rendered.subject).toBe('Zaproszenie do Content Chain');
    expect(rendered.html).toContain('Content Chain');
    expect(rendered.html).toContain('Akceptuj zaproszenie');
    expect(rendered.html).toContain(escapeHtml(INVITE_URL));
    expect(rendered.html).toContain(escapeHtml(VALIDITY));
    expect(rendered.html).toContain('Link jest jednorazowy i wygasa po');
    expect(rendered.html).not.toMatch(/Link jest jednorazowy\.\s*Link jest/);
    expect(rendered.html).toContain('#39a185');
    expect(rendered.html).not.toContain('Token (np. Postman)');
    expect(rendered.text).toContain(INVITE_URL);
    expect(rendered.text).toContain(VALIDITY);
    expect(rendered.text).not.toContain('Token (np. Postman)');
    expect(rendered.subject).not.toMatch(/invited|Activate/i);
    expect(rendered.html).toContain('cid:brand-logo@content-chain');
    expect(rendered.html).toMatch(
      /<img[^>]+src="cid:brand-logo@content-chain"[^>]+alt="Content Chain"/,
    );
    expect(rendered.text.startsWith('Content Chain')).toBe(true);
    expect(rendered.attachments).toHaveLength(1);
    expect(rendered.attachments?.[0]?.cid).toBe('brand-logo@content-chain');
  });

  it('renders PL activation mail with validity label and CTA url (URL-only raw)', () => {
    const rendered = renderTransactionalMail({
      kind: 'user_activation',
      to: 'newbie@example.com',
      activationId: createAccountActivationId(
        'act_11111111-1111-4111-8111-111111111111',
      ),
      activateUrl: ACTIVATE_URL,
      rawToken: 'tok_activate_raw_1',
      validityLabel: VALIDITY,
    });

    expect(rendered.subject).toBe('Aktywuj konto w Content Chain');
    expect(rendered.html).toContain('Aktywuj konto');
    expect(rendered.html).toContain(escapeHtml(ACTIVATE_URL));
    expect(rendered.html).toContain(escapeHtml(VALIDITY));
    expect(rendered.html).toContain('Link jest jednorazowy i wygasa po');
    expect(rendered.html).not.toMatch(/Link jest jednorazowy\.\s*Link jest/);
    expect(rendered.html).not.toContain('Token (np. Postman)');
    expect(rendered.text).toContain(ACTIVATE_URL);
    expect(rendered.text).toContain(VALIDITY);
    expect(rendered.text).not.toContain('Token (np. Postman)');
    expect(rendered.html).toContain('cid:brand-logo@content-chain');
    expect(rendered.text.startsWith('Content Chain')).toBe(true);
    expect(rendered.attachments).toHaveLength(1);
    expect(rendered.attachments?.[0]?.cid).toBe('brand-logo@content-chain');
  });

  it('escapes html-special characters in injected url and validity label', () => {
    const evilUrl = 'https://app.example/invite/accept?token=a&b=<x>"';
    const evilValidity =
      'Link jest jednorazowy i wygasa po <script>1d</script>.';
    const rendered = renderTransactionalMail({
      kind: 'user_invited',
      to: 'member@example.com',
      invitationId: createInvitationId(
        'inv_22222222-2222-4222-8222-222222222222',
      ),
      acceptUrl: evilUrl,
      rawToken: 'tok_<raw>&"',
      validityLabel: evilValidity,
    });

    expect(rendered.html).not.toContain('<script>');
    expect(rendered.html).toContain(escapeHtml(evilUrl));
    expect(rendered.html).toContain(escapeHtml(evilValidity));
  });

  it('renders PL welcome mail with CID refs and without activation token', () => {
    const login = 'https://app.example/';
    const rendered = renderTransactionalMail({
      kind: 'user_welcome',
      to: 'newbie@example.com',
      email: 'newbie@example.com',
      appPublicUrl: 'https://app.example',
      login,
    });

    expect(rendered.subject).toBe('Witamy w Content Chain');
    expect(rendered.html).toContain('Witamy na pokładzie');
    expect(rendered.html).toContain(escapeHtml('newbie@example.com'));
    expect(rendered.html).toContain('Runy');
    expect(rendered.html).toContain('HITL');
    expect(rendered.html).toContain('Konto');
    expect(rendered.html).not.toContain('uzupełnij dane firmy');
    expect(rendered.html).toContain('cid:welcome-login@content-chain');
    expect(rendered.html).toContain('cid:welcome-runs@content-chain');
    expect(rendered.html).toContain(escapeHtml(login));
    expect(rendered.html).not.toMatch(/activationToken/i);
    expect(rendered.text).toContain('newbie@example.com');
    expect(rendered.text).toContain(login);
    expect(rendered.text).toContain('HITL');
    expect(rendered.text).not.toContain('uzupełnij dane firmy');
    expect(rendered.text).not.toMatch(/activationToken/i);
    expect(rendered.html).toContain('cid:brand-logo@content-chain');
    expect(rendered.text.startsWith('Content Chain')).toBe(true);
    expect(rendered.attachments).toHaveLength(3);
    expect(rendered.attachments?.[0]?.cid).toBe('brand-logo@content-chain');
    expect(rendered.attachments?.[1]?.cid).toBe('welcome-login@content-chain');
    expect(rendered.attachments?.[2]?.cid).toBe('welcome-runs@content-chain');
  });
});
