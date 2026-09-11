import { DocumentBuilder, type OpenAPIObject } from '@nestjs/swagger';

export const COOKIE_AUTH_NAME = 'cookieAuth';
export const ACCESS_COOKIE_NAME = 'cc_access';

export function buildSwaggerConfig(): Omit<OpenAPIObject, 'paths'> {
  return new DocumentBuilder()
    .setTitle('Content Chain API')
    .setDescription(
      'HTTP API Content Chain. Sesja MVP: httpOnly cookie `cc_access` (JWT) + `cc_refresh` (rotowany; tylko POST /auth/refresh). Po loginie / bootstrap-admin przeglądarka ustawia oba. Try it out na POST /auth/login, potem chronione trasy — bez Authorization Bearer.',
    )
    .setVersion('1.0')
    .addCookieAuth(
      ACCESS_COOKIE_NAME,
      {
        type: 'apiKey',
        in: 'cookie',
        name: ACCESS_COOKIE_NAME,
        description:
          'Access JWT. Set by POST /auth/login and POST /auth/bootstrap-admin.',
      },
      COOKIE_AUTH_NAME,
    )
    .build();
}
