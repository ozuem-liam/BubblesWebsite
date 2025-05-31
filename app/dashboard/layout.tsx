import DashboardPageLayout from "@/components/sections/dashboard/DashboardLayout"


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <DashboardPageLayout>{children}</DashboardPageLayout>
}
