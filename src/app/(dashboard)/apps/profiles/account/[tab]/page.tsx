import AccountProfile from 'views/apps/AccountProfile';

type Props = {
  params: Promise<{ tab: string }>;
};

export default async function Page({ params }: Props) {
  const { tab } = await params;

  return <AccountProfile tab={tab} />;
}

export async function generateStaticParams() {
  const response = ['basic', 'personal', 'my-account', 'password', 'role', 'settings', 'aparencia', 'usuarios'];

  return response.map((tab: string) => ({
    tab: tab
  }));
}
