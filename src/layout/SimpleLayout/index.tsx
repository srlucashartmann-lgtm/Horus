'use client';

import { lazy, ReactNode } from 'react';

// next
import { usePathname } from 'next/navigation';

// material-ui
const Header = lazy(() => import('components/pages/Header'));
const FooterBlock = lazy(() => import('components/pages/FooterBlock'));

// project-imports
import Loader from 'components/Loader';
import { useGetMenuMaster } from 'api/menu';

// ==============================|| LAYOUTS - STRUCTURE ||============================== //

interface Props {
  children: ReactNode;
}

export default function SimpleLayout({ children }: Props) {
  const { menuMasterLoading } = useGetMenuMaster();

  const pathname = usePathname();
  const layout = pathname === '/' || pathname === '/landing' ? 'landing' : 'simple';

  if (menuMasterLoading) return <Loader />;

  return (
    <>
      <Header />
      {children}
      <FooterBlock isFull={layout === 'landing'} />
    </>
  );
}
