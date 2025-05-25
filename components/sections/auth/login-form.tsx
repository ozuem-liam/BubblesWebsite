"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Text } from "../../../components/global/Text";
import { toast } from "sonner";
import { useAuth } from "../../../contexts/auth-context";
import { authService } from "../../../lib/auth";

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      if (response.code === 200 && response.data?.token) {
        toast.success(response.message || 'Login successful');
        
        // Set token in cookies
        document.cookie = `token=${response.data.token}; path=/; secure; samesite=strict`;
        
        // Call auth context login
        login(response.data);
        
        // Handle redirect
        const searchParams = new URLSearchParams(window.location.search);
        const from = searchParams.get('from') || '/dashboard';
        router.push(from);
      } else {
        // setError(response.message || 'Login failed');
      }
    } catch (err) {
      // setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#001D48] to-[#000c1d] pt-[10rem] pb-10 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-[#00112b] rounded-lg shadow-xl p-8 border border-[#1a3b6d]">
            <Text
              as="h1"
              style="text-white text-3xl font-bold mb-6 text-center"
            >
              Welcome Back
            </Text>

            <Text
              as="p"
              style="text-[#CCD0D4] mb-8 text-center"
            >
              Sign in to your account to continue
            </Text>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-xs text-sm font-medium text-[#CCD0D4] mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 px-4 rounded-md bg-[#001D48] text-white border border-[#1a3b6d] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-xs text-sm font-medium text-[#CCD0D4]"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#bfdbfe] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 px-4 rounded-md bg-[#001D48] text-white border border-[#1a3b6d] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#bfdbfe] text-[#001D48] text-sm font-medium py-3 rounded-md hover:bg-[#9cc2fe] transition-colors"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[#CCD0D4]">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#bfdbfe] hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
