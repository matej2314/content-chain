import type { RunId } from '@content-chain/shared';
import type {
  PageDocument,
  PageOutline,
  VerifierVerdict as ContentVerifierVerdict,
} from '../../content/domain/content.types';
import type {
  ReelIdea,
  ReelScript,
  ReelScriptItem,
  SocialContent,
  SocialContentItem,
  SocialIdea,
  VerifierVerdict as SocialVerifierVerdict,
} from '../../social/domain/social.types';

export const OUTPUT_EDITED_WRITER = Symbol('OUTPUT_EDITED_WRITER');

export type OutputEditedWrite =
  | { readonly kind: 'ideas'; readonly ideas: readonly SocialIdea[] }
  | { readonly kind: 'reelIdeas'; readonly ideas: readonly ReelIdea[] }
  | {
      readonly kind: 'content';
      readonly content: SocialContent;
      readonly verification: SocialVerifierVerdict;
    }
  | {
      readonly kind: 'contents';
      readonly items: readonly SocialContentItem[];
      readonly verification: SocialVerifierVerdict;
    }
  | {
      readonly kind: 'reelScript';
      readonly script: ReelScript;
      readonly verification: SocialVerifierVerdict;
    }
  | {
      readonly kind: 'reelScripts';
      readonly items: readonly ReelScriptItem[];
      readonly verification: SocialVerifierVerdict;
    }
  | { readonly kind: 'pageOutline'; readonly outline: PageOutline }
  | {
      readonly kind: 'pageDocument';
      readonly document: PageDocument;
      readonly verification: ContentVerifierVerdict;
    };

export interface OutputEditedWriter {
  /**
   * Sets `outputEdited` and persists replacements iff `reviewFinalizedAt` is null.
   * Returns false when the review is already finalized (no store mutation).
   */
  commit(runId: RunId, writes: readonly OutputEditedWrite[]): Promise<boolean>;
}
