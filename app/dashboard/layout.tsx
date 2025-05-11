import { DashboardHeader } from "../../components/sections/dashboard/dashboard-header";
import { DashboardSidebar } from "../../components/sections/dashboard/dashboard-sidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001D48] to-[#000c1d] text-white">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}