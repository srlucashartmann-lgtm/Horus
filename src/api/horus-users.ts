import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import { HorusUserPublic } from 'types/horus';

const endpoints = {
  key: '/api/users',
  list: ''
};

async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao carregar usuários');
  return res.json();
}

export function useGetHorusUsers() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      users: (data?.users as HorusUserPublic[]) || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && (!data?.users || data.users.length === 0)
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function insertHorusUser(userData: {
  name: string;
  email: string;
  password: string;
  role: string;
  permissions: string[];
}): Promise<HorusUserPublic> {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Erro ao criar usuário');
  }

  const { user } = await res.json();

  mutate(
    endpoints.key,
    (current: any) => ({
      ...current,
      users: [...(current?.users || []), user]
    }),
    false
  );

  return user;
}

export async function updateHorusUser(
  id: string,
  userData: { name?: string; email?: string; role?: string; permissions?: string[]; active?: boolean; password?: string }
): Promise<HorusUserPublic> {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Erro ao atualizar usuário');
  }

  const { user } = await res.json();

  mutate(
    endpoints.key,
    (current: any) => ({
      ...current,
      users: (current?.users || []).map((u: HorusUserPublic) => (u.id === id ? user : u))
    }),
    false
  );

  return user;
}

export async function deleteHorusUser(id: string): Promise<void> {
  const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Erro ao deletar usuário');
  }

  mutate(
    endpoints.key,
    (current: any) => ({
      ...current,
      users: (current?.users || []).filter((u: HorusUserPublic) => u.id !== id)
    }),
    false
  );
}
