// project-imports
import DashboardLayout from 'layout/DashboardLayout';
// import AuthGuard from 'utils/route-guard/AuthGuard'; // TEMPORÁRIO: desabilitado para testes E2E

// ==============================|| DASHBOARD LAYOUT ||============================== //

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>{children}</DashboardLayout>
  );
}
