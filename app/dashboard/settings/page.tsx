
import { Settings } from "@/components/sections/settings/Settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Bubbles",
};

export default async function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <Settings />
    </div>
  );
}
