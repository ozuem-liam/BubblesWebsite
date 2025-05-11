"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "../../../lib/auth";
import { useAuth } from "../../../contexts/auth-context";

// Create a separate component for the form that uses useSearchParams
const OtpFormContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.verifyOtp({ email, otp, token });
      if (response?.data?.token) {
        login(response.data);
        router.push("/dashboard");
      } else {
        setError(response?.message || "OTP verification failed");
      }
    } catch (err) {
      setError("An error occurred during OTP verification");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await authService.sendOtp(email);
      if (response?.data?.token) {
        setToken(response.data.token);
        setOtpSent(true);
      } else {
        setError(response?.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("An error occurred while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001D48] to-[#000c1d] pt-24 pb-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="max-w-md mx-auto p-6 bg-[#222] rounded-lg shadow-lg">
          {/* ... rest of your JSX remains the same ... */}
        </div>
      </div>
    </div>
  );
};

// Main component that wraps the form in Suspense
export const OtpForm = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpFormContent />
    </Suspense>
  );
};