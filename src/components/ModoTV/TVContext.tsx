'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface TVContextType {
  open: boolean;
  openTV: () => void;
  closeTV: () => void;
}

const TVContext = createContext<TVContextType>({ open: false, openTV: () => {}, closeTV: () => {} });

export function TVProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openTV = useCallback(() => setOpen(true), []);
  const closeTV = useCallback(() => setOpen(false), []);

  return <TVContext.Provider value={{ open, openTV, closeTV }}>{children}</TVContext.Provider>;
}

export function useTV() {
  return useContext(TVContext);
}
