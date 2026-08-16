import type {
  Completeness,
  CompanyContext,
} from '../domain/company-context.types';
import type { PartialCompanyContext } from '../domain/company-context.port';
import type {
  PatchCompanyContextDto,
  PutCompanyContextDto,
} from '../http/dto/company-context.dto';

export function toCompanyContext(dto: PutCompanyContextDto): CompanyContext {
  return {
    identity: {
      name: dto.identity.name,
      description: dto.identity.description,
    },
    offer: { items: dto.offer.items },
    voice: { weDo: dto.voice.weDo, weDont: dto.voice.weDont },
    cta: { items: dto.cta.items },
    audience: { profiles: dto.audience.profiles },
    extras: dto.extras ?? null,
  };
}

export function toPartialCompanyContext(
  dto: PatchCompanyContextDto,
): PartialCompanyContext {
  return {
    ...(dto.identity ? { identity: dto.identity } : {}),
    ...(dto.offer ? { offer: dto.offer } : {}),
    ...(dto.voice ? { voice: dto.voice } : {}),
    ...(dto.cta ? { cta: dto.cta } : {}),
    ...(dto.audience ? { audience: dto.audience } : {}),
    ...(dto.extras !== undefined ? { extras: dto.extras } : {}),
  };
}

export function toPublicCompanyContext(
  context: CompanyContext,
  completeness: Completeness,
) {
  return { ...context, completeness };
}
