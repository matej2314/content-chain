'use client';

import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import {
  createEventSourceRegistry,
  type EventSourceRegistry,
} from '@/modules/shell/event-source-registry';

const EventSourceRegistryContext = createContext<EventSourceRegistry | null>(null);

export function EventSourceRegistryProvider({ children }: { readonly children: ReactNode }) {
  const registry = useMemo(() => createEventSourceRegistry(), []);

  useEffect(() => {
    return () => {
     registry.closeAll();
    };
  }, [registry]);

  return (
    <EventSourceRegistryContext.Provider value={registry}>
      {children}
    </EventSourceRegistryContext.Provider>
  );
}

export function useEventSourceRegistry(): EventSourceRegistry {
  const value = useContext(EventSourceRegistryContext);
  if (!value) {
    throw new Error('useEventSourceRegistry must be used within EventSourceRegistryProvider');
  }
  return value;
}
