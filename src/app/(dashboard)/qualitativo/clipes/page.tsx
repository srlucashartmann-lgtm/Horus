import ClipesView from 'views/horus/ClipesView';
import PermissionGuard from 'utils/route-guard/PermissionGuard';

export default function ClipesPage() {
  return (
    <PermissionGuard permission="clipes">
      <ClipesView />
    </PermissionGuard>
  );
}
