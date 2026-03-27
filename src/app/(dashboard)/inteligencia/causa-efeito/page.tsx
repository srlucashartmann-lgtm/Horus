import CausaEfeitoView from 'views/horus/CausaEfeitoView';
import PermissionGuard from 'utils/route-guard/PermissionGuard';

export default function CausaEfeitoPage() {
  return (
    <PermissionGuard permission="causa-efeito">
      <CausaEfeitoView />
    </PermissionGuard>
  );
}
