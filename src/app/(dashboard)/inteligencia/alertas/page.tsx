import AlertasView from 'views/horus/AlertasView';
import PermissionGuard from 'utils/route-guard/PermissionGuard';

export default function AlertasPage() {
  return (
    <PermissionGuard permission="alertas">
      <AlertasView />
    </PermissionGuard>
  );
}
