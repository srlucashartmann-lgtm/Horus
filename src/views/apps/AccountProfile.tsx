'use client';

import { useEffect } from 'react';

// next
import { useRouter, usePathname } from 'next/navigation';

// material-ui
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';

// project-imports
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';
import MainCard from 'components/MainCard';
import { GRID_COMMON_SPACING } from 'config';
import usePermissions from 'hooks/usePermissions';

import TabAparencia from 'sections/apps/profiles/account/TabAparencia';
import TabUsuarios from 'sections/apps/profiles/account/TabUsuarios';

// assets
import { Brush2, SecurityUser } from '@wandersonalwes/iconsax-react';

type Props = {
  tab: string;
};

export default function AccountProfile({ tab }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { menuMaster } = useGetMenuMaster();
  const { isAdmin } = usePermissions();

  const validTabs = ['aparencia', ...(isAdmin ? ['usuarios'] : [])];
  const currentTab = validTabs.includes(tab) ? tab : 'aparencia';

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    router.replace(`/apps/profiles/account/${newValue}`);
  };

  useEffect(() => {
    if (menuMaster.openedItem !== 'account-profile') handlerActiveItem('account-profile');
    // eslint-disable-next-line
  }, [pathname]);

  if (tab === 'usuarios' && !isAdmin) {
    router.replace('/acesso-restrito');
    return null;
  }

  return (
    <MainCard border={false}>
      <Stack sx={{ gap: GRID_COMMON_SPACING }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={currentTab} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="configurações">
            <Tab label="Aparência" icon={<Brush2 />} value="aparencia" iconPosition="start" />
            {isAdmin && <Tab label="Usuários" icon={<SecurityUser />} value="usuarios" iconPosition="start" />}
          </Tabs>
        </Box>
        <Box>
          {currentTab === 'aparencia' && <TabAparencia />}
          {currentTab === 'usuarios' && isAdmin && <TabUsuarios />}
        </Box>
      </Stack>
    </MainCard>
  );
}
