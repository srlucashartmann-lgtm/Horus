'use client';

import { useSession } from 'next-auth/react';
import { Permission } from 'types/horus';

interface UserProps {
  name: string;
  email: string;
  avatar: string;
  thumb: string;
  role: string;
  permissions: Permission[];
}

export default function useUser(): UserProps | false {
  const { data: session } = useSession();

  if (session?.user) {
    const user = session.user;

    return {
      name: user.name || 'Usuário',
      email: user.email || '',
      avatar: user.avatar || '/assets/images/users/avatar-1.png',
      thumb: user.avatar || '/assets/images/users/avatar-thumb-1.png',
      role: user.role || 'analista',
      permissions: (user.permissions as Permission[]) || []
    };
  }

  return false;
}
