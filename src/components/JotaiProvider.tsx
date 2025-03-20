'use client';

import { Provider, createStore } from 'jotai';
import { ReactNode } from 'react';

const store = createStore();

export function JotaiProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
