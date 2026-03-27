import SessaoDetailView from 'views/horus/SessaoDetailView';
import PermissionGuard from 'utils/route-guard/PermissionGuard';

type Props = { params: Promise<{ id: string }> };

export default async function SessaoPage({ params }: Props) {
  const { id } = await params;
  return (
    <PermissionGuard permission="sessoes">
      <SessaoDetailView id={id} />
    </PermissionGuard>
  );
}
