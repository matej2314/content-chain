import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../shared/persistence/prisma.service';
import { COMPANY_CONTEXT_SINGLETON_ID } from '../domain/company-context.constants';
import type {
  CompanyContextRepository,
  PartialCompanyContext,
} from '../domain/company-context.query.port';
import {
  emptyCompanyContext,
  type AudienceProfile,
  type CompanyContext,
  type CompanyContextExtras,
  type CtaItem,
  type OfferItem,
} from '../domain/company-context.types';

type CompanyContextRow = {
  identityName: string;
  identityDescription: string;
  offerItems: Prisma.JsonValue;
  voiceWeDo: string;
  voiceWeDont: string;
  ctaItems: Prisma.JsonValue;
  audienceProfiles: Prisma.JsonValue;
  extras: Prisma.JsonValue | null;
};

const toInputJson = (value: unknown): Prisma.InputJsonValue =>
  value as Prisma.InputJsonValue;

const jsonArray = <T>(value: Prisma.JsonValue, fallback: T[] = []): T[] =>
  Array.isArray(value) ? (value as T[]) : fallback;

const jsonRecord = (
  value: Prisma.JsonValue | null,
): CompanyContextExtras | null => {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  return value as CompanyContextExtras;
};

@Injectable()
export class PrismaCompanyContextAdapter implements CompanyContextRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(): Promise<CompanyContext> {
    const row = await this.prisma.companyContext.findUnique({
      where: { id: COMPANY_CONTEXT_SINGLETON_ID },
    });
    return row ? this.toDomain(row) : emptyCompanyContext();
  }

  async put(context: CompanyContext): Promise<CompanyContext> {
    const row = await this.prisma.companyContext.upsert({
      where: { id: COMPANY_CONTEXT_SINGLETON_ID },
      create: this.toRow(context),
      update: this.toRow(context),
    });
    return this.toDomain(row);
  }

  async patch(partial: PartialCompanyContext): Promise<CompanyContext> {
    const current = await this.get();
    const merged: CompanyContext = {
      identity: { ...current.identity, ...partial.identity },
      offer: { items: partial.offer?.items ?? current.offer.items },
      voice: { ...current.voice, ...partial.voice },
      cta: { items: partial.cta?.items ?? current.cta.items },
      audience: {
        profiles: partial.audience?.profiles ?? current.audience.profiles,
      },
      extras: partial.extras === undefined ? current.extras : partial.extras,
    };
    return this.put(merged);
  }

  private toRow(context: CompanyContext) {
    return {
      id: COMPANY_CONTEXT_SINGLETON_ID,
      identityName: context.identity.name,
      identityDescription: context.identity.description,
      offerItems: toInputJson(context.offer.items),
      voiceWeDo: context.voice.weDo,
      voiceWeDont: context.voice.weDont,
      ctaItems: toInputJson(context.cta.items),
      audienceProfiles: toInputJson(context.audience.profiles),
      extras:
        context.extras == null ? Prisma.JsonNull : toInputJson(context.extras),
    };
  }

  private toDomain(row: CompanyContextRow): CompanyContext {
    return {
      identity: {
        name: row.identityName,
        description: row.identityDescription,
      },
      offer: { items: jsonArray<OfferItem>(row.offerItems) },
      voice: { weDo: row.voiceWeDo, weDont: row.voiceWeDont },
      cta: { items: jsonArray<CtaItem>(row.ctaItems) },
      audience: { profiles: jsonArray<AudienceProfile>(row.audienceProfiles) },
      extras: jsonRecord(row.extras),
    };
  }
}
