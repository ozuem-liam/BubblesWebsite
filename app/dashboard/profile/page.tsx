import { Metadata } from "next";
import { ProfileView } from "@/components/sections/profile/profile-view";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile | Bubbles",
};

export default async function ProfilePage() {
  // Server-side protection
  const cookiesData = await cookies();
  const token = cookiesData.get("token")?.value;
  if (!token) {
    redirect("/login?from=/dashboard");
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileView />
    </div>
  );
}
