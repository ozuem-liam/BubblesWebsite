import { Metadata } from "next";
import { LoginForm } from "@/components/sections/auth/login-form";
import { Footer } from "@/components/global/Footer";
import { TopNav } from "@/components/global/TopNav";

export const metadata: Metadata = {
  title: "Login | Bubbles",
};

export default function LoginPage() {
  return (
    <main>
      <TopNav />
      <LoginForm />
      <Footer />
    </main>
  );
}
