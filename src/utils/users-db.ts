import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { HorusUser, HorusUserPublic, ALL_PERMISSIONS } from 'types/horus';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'users.json');

function getInitialUsers(): HorusUser[] {
  return [
    {
      id: '1',
      name: 'Lucas Hartmann',
      email: 'srlucashartmann@gmail.com',
      password: bcrypt.hashSync('Horus@2026', 10),
      role: 'admin',
      permissions: [...ALL_PERMISSIONS],
      avatar: '/assets/images/users/avatar-1.png',
      active: true,
      createdAt: '2026-03-20'
    },
    {
      id: '2',
      name: 'Analista Hórus',
      email: 'analista@horus.com',
      password: bcrypt.hashSync('analista123', 10),
      role: 'analista',
      permissions: ['war-room', 'tracking'],
      avatar: '/assets/images/users/avatar-2.png',
      active: true,
      createdAt: '2026-03-20'
    }
  ];
}

function readUsers(): HorusUser[] {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial = getInitialUsers();
      writeUsers(initial);
      return initial;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    const initial = getInitialUsers();
    writeUsers(initial);
    return initial;
  }
}

function writeUsers(users: HorusUser[]) {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

function stripPassword(user: HorusUser): HorusUserPublic {
  const { password, ...rest } = user;
  return rest;
}

export function getUsers(): HorusUserPublic[] {
  return readUsers().map(stripPassword);
}

export function getUserByEmail(email: string): HorusUser | undefined {
  return readUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string): HorusUser | undefined {
  return readUsers().find((u) => u.id === id);
}

export function validatePassword(plainPassword: string, hashedPassword: string): boolean {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

export function createUser(data: { name: string; email: string; password: string; role: 'admin' | 'analista'; permissions: string[] }): HorusUserPublic {
  const users = readUsers();

  const exists = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase());
  if (exists) {
    throw new Error('Email já cadastrado');
  }

  const maxId = users.reduce((max, u) => Math.max(max, parseInt(u.id, 10) || 0), 0);

  const newUser: HorusUser = {
    id: String(maxId + 1),
    name: data.name,
    email: data.email,
    password: bcrypt.hashSync(data.password, 10),
    role: data.role,
    permissions: data.role === 'admin' ? [...ALL_PERMISSIONS] : (data.permissions as any[]),
    avatar: '/assets/images/users/avatar-1.png',
    active: true,
    createdAt: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);
  writeUsers(users);

  return stripPassword(newUser);
}

export function updateUser(
  id: string,
  data: { name?: string; email?: string; role?: 'admin' | 'analista'; permissions?: string[]; active?: boolean; password?: string }
): HorusUserPublic {
  const users = readUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    throw new Error('Usuário não encontrado');
  }

  if (data.email) {
    const emailConflict = users.find((u) => u.email.toLowerCase() === data.email!.toLowerCase() && u.id !== id);
    if (emailConflict) {
      throw new Error('Email já cadastrado por outro usuário');
    }
  }

  const user = users[index];

  if (data.name !== undefined) user.name = data.name;
  if (data.email !== undefined) user.email = data.email;
  if (data.active !== undefined) user.active = data.active;
  if (data.password) user.password = bcrypt.hashSync(data.password, 10);

  if (data.role !== undefined) {
    user.role = data.role;
    if (data.role === 'admin') {
      user.permissions = [...ALL_PERMISSIONS];
    }
  }

  if (data.permissions !== undefined && user.role !== 'admin') {
    user.permissions = data.permissions as any[];
  }

  users[index] = user;
  writeUsers(users);

  return stripPassword(user);
}

export function deleteUser(id: string): boolean {
  const users = readUsers();
  const filtered = users.filter((u) => u.id !== id);

  if (filtered.length === users.length) {
    throw new Error('Usuário não encontrado');
  }

  writeUsers(filtered);
  return true;
}
