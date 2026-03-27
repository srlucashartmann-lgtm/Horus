'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loader from 'components/Loader';
import { GuardProps } from 'types/auth';

export default function GuestGuard({ children }: GuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      router.push('/war-room');
    }
  }, [status, session, router]);

  if (status === 'loading' || session?.user) return <Loader />;

  return <>{children}</>;
}
