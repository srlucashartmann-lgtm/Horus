'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Permission } from 'types/horus';
import Loader from 'components/Loader';

interface PermissionGuardProps {
  children: ReactNode;
  permission?: Permission;
  fallback?: ReactNode;
}

export default function PermissionGuard({ children, permission, fallback }: PermissionGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  /** Boolean estável nas deps: não usar o nó `fallback` direto (nova referência a cada render). */
  const hasFallback = fallback != null;

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user) {
      router.push('/login');
      return;
    }

    if (!permission) return;

    const { role, permissions } = session.user;
    if (role === 'admin') return;
    if (permissions?.includes(permission)) return;
    if (hasFallback) return;

    router.push('/acesso-restrito');
  }, [status, session, permission, hasFallback, router]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (!session?.user) {
    return <Loader />;
  }

  if (!permission) {
    return <>{children}</>;
  }

  const { role, permissions } = session.user;

  if (role === 'admin') {
    return <>{children}</>;
  }

  if (permissions?.includes(permission)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return <Loader />;
}
