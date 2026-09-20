import type { Metadata } from 'next';
import { RunDetailsView } from '@/modules/runs/components/run-details-view';

export const metadata: Metadata = {
  title: 'Content Chain - Szczegóły runu'
}

export default async function RunDetailsPage({ params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  return <RunDetailsView key={runId} runIdParam={runId} />;
}
