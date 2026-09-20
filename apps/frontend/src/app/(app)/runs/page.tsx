import type { Metadata } from 'next';
import { ArchiveRunsView } from '@/modules/runs/components/archive-runs-view';

export const metadata: Metadata = {
  title: 'Content Chain - Historia runów'
}

export default function RunsPage() {
  return <ArchiveRunsView />;
}
