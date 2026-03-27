import TrackingView from 'views/horus/TrackingView';
import PermissionGuard from 'utils/route-guard/PermissionGuard';

export default function TrackingPage() {
  return (
    <PermissionGuard permission="tracking">
      <TrackingView />
    </PermissionGuard>
  );
}
