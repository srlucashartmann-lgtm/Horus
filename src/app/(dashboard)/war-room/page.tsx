'use client';

import PermissionGuard from 'utils/route-guard/PermissionGuard';
import WarRoomDashboard from 'sections/horus/war-room/WarRoomDashboard';

export default function WarRoomPage() {
  return (
    <PermissionGuard permission="war-room">
      <WarRoomDashboard />
    </PermissionGuard>
  );
}
