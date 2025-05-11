import { Footer } from "../../components/global/Footer";
import { TopNav } from "../../components/global/TopNav";
import { SignupForm } from "../../components/sections/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Bubbles",
};

export default function SignupPage() {
  return (
    <main>
      <TopNav />
      <SignupForm />
      <Footer />
    </main>
  );
}
