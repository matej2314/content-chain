import type { Metadata } from 'next';
import { CompanyContextView } from '@/modules/company-context/components/company-context-view';

export const metadata: Metadata = {
  title: 'Kontekst Twojej firmy'
}

export default function ContextPage() {
  return <CompanyContextView />;
}
