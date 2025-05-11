import { Settings } from "@/components/sections/settings/settings";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings | Bubbles",
};

export default async function SettingsPage() {
  // Server-side protection
  const cookiesData = await cookies();
  const token = cookiesData.get("token")?.value;
  if (!token) {
    redirect("/login?from=/dashboard");
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Settings />
    </div>
  );
}
