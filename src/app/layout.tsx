import { ReactNode } from 'react';

import type { Metadata } from 'next';

import './globals.css';

// project-imports
import ProviderWrapper from './ProviderWrapper';

export const metadata: Metadata = {
  title: 'HÓRUS',
  description: 'Sistema de inteligência para campanhas eleitorais. Cruza dados quantitativos e qualitativos para gerar insights acionáveis.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
