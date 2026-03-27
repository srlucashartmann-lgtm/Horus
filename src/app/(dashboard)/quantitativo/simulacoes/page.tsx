import SimulacoesView from 'views/horus/SimulacoesView';
import PermissionGuard from 'utils/route-guard/PermissionGuard';

export default function SimulacoesPage() {
  return (
    <PermissionGuard permission="simulacoes">
      <SimulacoesView />
    </PermissionGuard>
  );
}
