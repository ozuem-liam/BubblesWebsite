import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ShopList } from "../../../components/sections/shop/shop-list";

export const metadata: Metadata = {
  title: "Shops | Bubbles",
};

export default async function ShopPage() {
  // Server-side protection
  const cookiesData = await cookies();
  const token = cookiesData.get("token")?.value;
  if (!token) {
    redirect("/login?from=/dashboard");
  }
  return (
    <main>
      <h2 className="text-white text-xl font-bold">Featured Shops</h2>
      <ShopList />
    </main>
  );
}
