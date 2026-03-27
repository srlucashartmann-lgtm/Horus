'use client';

import { lazy, ReactNode } from 'react';

// material-ui
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

// project-imports
import LayoutContent from './LayoutContent';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';
import Loader from 'components/Loader';

const Header = lazy(() => import('components/pages/Header'));
const FooterBlock = lazy(() => import('components/pages/FooterBlock'));

// ==============================|| COMPONENT LAYOUT ||============================== //

interface Props {
  children: ReactNode;
}

export default function ComponentLayout({ children }: Props) {
  const { menuMasterLoading, menuMaster } = useGetMenuMaster();
  if (menuMasterLoading) return <Loader />;

  return (
    <>
      <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 2.5 } }}>
        <Header
          variant="component"
          enableComponentDrawer={true}
          onComponentDrawerToggle={handlerComponentDrawer}
          isComponentDrawerOpened={menuMaster.isComponentDrawerOpened}
        />
        <Toolbar sx={{ mt: 2 }} />
        <LayoutContent>{children}</LayoutContent>
      </Container>
      <FooterBlock />
    </>
  );
}
