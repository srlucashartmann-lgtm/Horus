import CrossTabsView from 'views/horus/CrossTabsView';
import PermissionGuard from 'utils/route-guard/PermissionGuard';

export default function CrossTabsPage() {
  return (
    <PermissionGuard permission="cross-tabs">
      <CrossTabsView />
    </PermissionGuard>
  );
}
