import { Dashboard } from "@/components/sections/dashboard/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Bubbles",
};

export default async function DashboardPage() {

  return <Dashboard/>;
}