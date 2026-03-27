import SentimentosView from 'views/horus/SentimentosView';
import PermissionGuard from 'utils/route-guard/PermissionGuard';

export default function SentimentosPage() {
  return (
    <PermissionGuard permission="sentimentos">
      <SentimentosView />
    </PermissionGuard>
  );
}
