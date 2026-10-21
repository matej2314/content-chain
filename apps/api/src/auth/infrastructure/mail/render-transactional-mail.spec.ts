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
const VALIDITY = 'Link wygasa po 7 dni.';

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
    expect(rendered.html).toContain('#39a185');
    expect(rendered.html).not.toContain('Token (np. Postman)');
    expect(rendered.text).toContain(INVITE_URL);
    expect(rendered.text).toContain(VALIDITY);
    expect(rendered.text).not.toContain('Token (np. Postman)');
    expect(rendered.subject).not.toMatch(/invited|Activate/i);
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
    expect(rendered.html).not.toContain('Token (np. Postman)');
    expect(rendered.text).toContain(ACTIVATE_URL);
    expect(rendered.text).toContain(VALIDITY);
    expect(rendered.text).not.toContain('Token (np. Postman)');
  });

  it('escapes html-special characters in injected url and validity label', () => {
    const evilUrl = 'https://app.example/invite/accept?token=a&b=<x>"';
    const evilValidity = 'Link wygasa po <script>1d</script>.';
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
});
