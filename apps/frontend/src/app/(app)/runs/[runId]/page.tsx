import { RunDetailsView } from '@/modules/runs/components/run-details-view';

export default async function RunDetailsPage({ params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  return <RunDetailsView key={runId} runIdParam={runId} />;
}
