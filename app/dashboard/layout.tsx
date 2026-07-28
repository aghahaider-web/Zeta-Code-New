// app/dashboard/layout.tsx — Section 7.1: dashboard must never be indexed
export const metadata = { robots: { index: false, follow: false } };

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
