"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/lib/auth";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/global/Text";

export const OtpForm = () => {
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
        setError(response?.data?.token || "OTP verification failed");
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
      if (response.data.token && response?.data?.token) {
        setToken(response.data.token);
        setOtpSent(true);
      } else {
        setError(response.data.token || "Failed to send OTP");
      }
    } catch (err) {
      setError("An error occurred while sending OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#001D48] to-[#000c1d] pt-24 pb-10 px-4">
        <div className="max-w-md mx-auto">
          <div className="max-w-md mx-auto p-6 bg-[#222] rounded-lg shadow-lg">
            <Text
              as="h2"
              style="text-white text-2xl mb-6 text-center font-semibold"
              children="Verify Your Email"
            />

            {error && (
              <div className="mb-4 p-2 bg-red-500 text-white rounded">
                {error}
              </div>
            )}

            {!otpSent ? (
              <div className="text-center">
                <Text
                  as="p"
                  style="text-[#CCD0D4] mb-4"
                  children={`We'll send a verification code to ${email}`}
                />
                <Button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="p-4 bg-[#bfdbfe] rounded-md text-[rgba(0, 57, 143, 1)] hover:bg-[#a3c4fd] transition-colors"
                >
                  {loading ? "Sending..." : "Send Verification Code"}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Text
                  as="p"
                  style="text-[#CCD0D4] mb-4"
                  children={`Enter the 6-digit code sent to ${email}`}
                />

                <div>
                  <label className="block text-[#CCD0D4] mb-1" htmlFor="otp">
                    Verification Code
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-3 py-2 bg-[#333] text-white rounded focus:outline-none focus:ring-2 focus:ring-[#bfdbfe]"
                    required
                    maxLength={6}
                    pattern="\d{6}"
                    title="Please enter a 6-digit code"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full p-4 bg-[#bfdbfe] rounded-md text-[rgba(0, 57, 143, 1)] hover:bg-[#a3c4fd] transition-colors"
                >
                  {loading ? "Verifying..." : "Verify Code"}
                </Button>

                <div className="text-center text-[#CCD0D4]">
                  Didn't receive a code?{" "}
                  <button
                    onClick={handleSendOtp}
                    className="text-[#bfdbfe] hover:underline"
                  >
                    Resend
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
