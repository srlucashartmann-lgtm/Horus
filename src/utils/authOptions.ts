import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserByEmail, validatePassword } from 'utils/users-db';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Digite seu email' },
        password: { name: 'password', label: 'Senha', type: 'password', placeholder: 'Digite sua senha' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são obrigatórios');
        }

        const user = getUserByEmail(credentials.email);

        if (!user) {
          throw new Error('Email ou senha incorretos');
        }

        if (!user.active) {
          throw new Error('Usuário desativado. Contate o administrador.');
        }

        const isValid = validatePassword(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Email ou senha incorretos');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: user.permissions,
          avatar: user.avatar || '/assets/images/users/avatar-1.png'
        };
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.permissions = (user as any).permissions;
        token.avatar = (user as any).avatar;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.permissions = token.permissions as string[];
        session.user.avatar = token.avatar as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT) || 86400
  },
  pages: {
    signIn: '/login'
  }
};
