import SessoesListView from 'views/horus/SessoesListView';
import PermissionGuard from 'utils/route-guard/PermissionGuard';

export default function SessoesPage() {
  return (
    <PermissionGuard permission="sessoes">
      <SessoesListView />
    </PermissionGuard>
  );
}
