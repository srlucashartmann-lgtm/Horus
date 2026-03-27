import SinteseSemanalView from 'views/horus/SinteseSemanalView';
import PermissionGuard from 'utils/route-guard/PermissionGuard';

export default function SintesePage() {
  return (
    <PermissionGuard permission="sintese">
      <SinteseSemanalView />
    </PermissionGuard>
  );
}
