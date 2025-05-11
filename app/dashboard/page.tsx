import { Metadata } from "next";
import { Dashboard } from "@/components/sections/dashboard/dashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Bubbles",
};

export default async function DashboardPage() {
  // Server-side protection
  const cookiesData = await cookies();
  const token = cookiesData.get("token")?.value;
  if (!token) {
    redirect("/login?from=/dashboard");
  }
  return (
    <main>
      <Dashboard />
    </main>
  );
}
