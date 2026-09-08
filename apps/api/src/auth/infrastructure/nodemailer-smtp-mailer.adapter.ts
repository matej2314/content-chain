import { Inject, Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { ENV, type Env } from '../../shared/config/env';
import type { Transporter } from 'nodemailer';
import type {
  TransactionalMailer,
  UserInvitedMail,
} from '../domain/transactional-mailer.port';

type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
};

function readSmtpConfig(env: Env): SmtpConfig {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_FROM) {
    throw new Error('SMTP configuration is missing');
  }
  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    user: SMTP_USER,
    pass: SMTP_PASS,
    from: MAIL_FROM,
  };
}

@Injectable()
export class NodemailerSmtpMailerAdapter implements TransactionalMailer {
  private readonly transporter: Transporter;
  private readonly from: string;

  constructor(@Inject(ENV) private readonly env: Env) {
    const smtp = readSmtpConfig(env);
    this.from = smtp.from;
    this.transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      auth: { user: smtp.user, pass: smtp.pass },
    });
  }

  async send(message: UserInvitedMail): Promise<void> {
    await this.transporter.sendMail({
      from: this.from,
      to: message.to,
      subject: 'You are invited to join Content Chain App',
      text: `You are invited to join Content Chain App. Please click the link below to accept the invitation: ${message.acceptUrl}\nToken: ${message.rawToken}`,
    });
  }
}
