import { apiFetch } from '@/shared/api/api-fetch';
import {
  feedbackRequestBody,
  parseFeedbackCreated,
  type CreateFeedbackInput,
  type FeedbackCreated,
} from '@/modules/feedback/api/feedback.types';

export async function createFeedback(input: CreateFeedbackInput): Promise<FeedbackCreated> {
  const body = await apiFetch('/feedback', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(feedbackRequestBody(input)),
  });
  return parseFeedbackCreated(body);
}
