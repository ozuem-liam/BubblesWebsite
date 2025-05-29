import DashboardPageLayout from '@/components/sections/dashboard/layout'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardPageLayout>{children}</DashboardPageLayout>
}
