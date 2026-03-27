import { MouseEvent } from 'react';

// next
import { useRouter } from 'next/navigation';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// project-imports
import { useTV } from 'components/ModoTV/TVContext';

// assets
import { Logout, Monitor, Setting2 } from '@wandersonalwes/iconsax-react';

interface Props {
  handleLogout: () => void;
}

export default function ProfileTab({ handleLogout }: Props) {
  const router = useRouter();
  const { openTV } = useTV();

  const handleNavigate = (event: MouseEvent<HTMLDivElement>, route: string) => {
    router.push(route);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton onClick={openTV}>
        <ListItemIcon>
          <Monitor variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Modo TV" />
      </ListItemButton>
      <ListItemButton onClick={(event) => handleNavigate(event, '/apps/profiles/account/aparencia')}>
        <ListItemIcon>
          <Setting2 variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Configurações" />
      </ListItemButton>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon>
          <Logout variant="Bulk" size={18} />
        </ListItemIcon>
        <ListItemText primary="Sair" />
      </ListItemButton>
    </List>
  );
}
