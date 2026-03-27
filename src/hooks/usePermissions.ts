'use client';

import { useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { Permission, ALL_PERMISSIONS } from 'types/horus';

interface UsePermissionsReturn {
  role: 'admin' | 'analista';
  permissions: Permission[];
  hasPermission: (permission: Permission) => boolean;
  isAdmin: boolean;
  isLoading: boolean;
}

export default function usePermissions(): UsePermissionsReturn {
  const { data: session, status } = useSession();

  const role = (session?.user?.role as 'admin' | 'analista') || 'analista';
  const permissions = useMemo(() => (session?.user?.permissions as Permission[]) || [], [session?.user?.permissions]);
  const isAdmin = role === 'admin';

  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      if (isAdmin) return true;
      return permissions.includes(permission);
    },
    [isAdmin, permissions]
  );

  return {
    role,
    permissions: isAdmin ? ALL_PERMISSIONS : permissions,
    hasPermission,
    isAdmin,
    isLoading: status === 'loading'
  };
}
