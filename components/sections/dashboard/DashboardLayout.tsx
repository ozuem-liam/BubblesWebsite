import { DashboardHeader } from "./dashboard-header";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};