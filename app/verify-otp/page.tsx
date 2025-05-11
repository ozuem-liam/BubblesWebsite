import { Footer } from "@/components/global/Footer";
import { OtpForm } from "@/components/sections/auth/otp-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify OTP | Bubbles",
};

export default function SignupPage() {
  return (
    <main>
      <OtpForm />
      <Footer />
    </main>
  );
}
