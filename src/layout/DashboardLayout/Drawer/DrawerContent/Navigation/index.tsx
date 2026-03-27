import { Fragment, useState, useMemo } from 'react';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import NavGroup from './NavGroup';
import NavItem from './NavItem';
import { useGetMenuMaster } from 'api/menu';
import { MenuOrientation, HORIZONTAL_MAX_ITEM } from 'config';
import useConfig from 'hooks/useConfig';
import usePermissions from 'hooks/usePermissions';
import menuItem from 'menu-items';

// types
import { NavItemType } from 'types/menu';
import { Permission } from 'types/horus';

const MENU_PERMISSION_MAP: Record<string, Permission> = {
  'war-room': 'war-room',
  tracking: 'tracking',
  'cross-tabs': 'cross-tabs',
  simulacoes: 'simulacoes',
  sessoes: 'sessoes',
  clipes: 'clipes',
  sentimentos: 'sentimentos',
  alertas: 'alertas',
  sintese: 'sintese',
  'causa-efeito': 'causa-efeito',
  configuracoes: 'configuracoes',
  dicionario: 'configuracoes'
};

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const {
    state: { menuOrientation }
  } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const { hasPermission, isAdmin } = usePermissions();

  const [selectedID, setSelectedID] = useState<string | null>(menuMaster.openedHorizontalItem);
  const [selectedItems, setSelectedItems] = useState<string | undefined>('');
  const [selectedLevel, setSelectedLevel] = useState<number>(0);

  const filteredMenuItems = useMemo(() => {
    if (isAdmin) return menuItem;

    const filtered = menuItem.items
      .map((group) => {
        if (!group.children) return group;

        const filteredChildren = group.children.filter((child) => {
          const requiredPermission = MENU_PERMISSION_MAP[child.id || ''];
          if (!requiredPermission) return true;
          return hasPermission(requiredPermission);
        });

        if (filteredChildren.length === 0) return null;

        return { ...group, children: filteredChildren };
      })
      .filter(Boolean) as NavItemType[];

    return { items: filtered };
  }, [isAdmin, hasPermission]);

  const menuItems = filteredMenuItems;

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  let lastItemIndex = menuItems.items.length - 1;
  let remItems: NavItemType[] = [];
  let lastItemId: string;

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id!;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
      title: item.title,
      elements: item.children,
      icon: item.icon,
      ...(item.url && {
        url: item.url
      })
    }));
  }

  const navGroups = menuItems.items.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemId) {
          return (
            <Fragment key={item.id}>
              {menuOrientation !== MenuOrientation.HORIZONTAL && <Divider sx={{ my: 0.5 }} />}
              <NavItem item={item} level={1} isParents setSelectedID={() => setSelectedID('')} />
            </Fragment>
          );
        }
        return (
          <NavGroup
            key={item.id}
            selectedID={selectedID}
            setSelectedID={setSelectedID}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            lastItem={lastItem!}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });
  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        '& > ul:first-of-type': { mt: 0 },
        display: isHorizontal ? { xs: 'block', lg: 'flex' } : 'block',
        alignItems: 'center'
      }}
    >
      {navGroups}
    </Box>
  );
}
