import { Dashboard } from "@/components/sections/dashboard/dashboard";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Bubbles",
};

export default async function DashboardPage() {
  const cookiesData = await cookies();
  const token = cookiesData.get("token")?.value;
  
  if (!token) {
    redirect("/auth/sign-in?from=/dashboard");
  }

  return <Dashboard />;
}