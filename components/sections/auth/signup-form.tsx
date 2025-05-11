"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/global/Text";
import { toast } from "sonner";
import { authService } from "@/lib/auth";

// Lagos local governments
const LAGOS_LOCAL_GOVERNMENTS = [
  "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", 
  "Apapa", "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", 
  "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", 
  "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", 
  "Oshodi-Isolo", "Shomolu", "Surulere"
];

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "Nigeria",
    state: "",
    localGovernment: "",
    city: "",
    password: "",
    userType: "customer"
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // First register the user
      const registerResponse = await authService.signup({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        country: formData.country,
        state: formData.state,
        local_government: formData.localGovernment,
        city: formData.city,
        password: formData.password,
        user_type: formData.userType
      });

      if (registerResponse?.data?.token) {
        // Then send OTP
        const otpResponse = await authService.sendOtp(formData.email);

        if (otpResponse.code === 200) {
          setSuccess('Registration successful! Please check your email for OTP.');
          // Redirect to OTP verification with email and token
          router.push(`/auth/verify-otp?email=${encodeURIComponent(formData.email)}`);
        } else {
          setError('Failed to send OTP. Please try again.');
        }
      } else {
        setError(registerResponse.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001D48] to-[#000c1d] pt-24 pb-10 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-[#00112b] rounded-lg shadow-xl p-8 border border-[#1a3b6d]">
          <Text as="h1" style="text-white text-3xl font-bold mb-6 text-center">
            Create an Account
          </Text>

          <Text as="p" style="text-[#CCD0D4] mb-8 text-center">
            Join us to discover all our services
          </Text>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-500/20 text-green-300 rounded-md">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[#CCD0D4] mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-md bg-[#001D48] text-white border border-[#1a3b6d] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] focus:border-transparent"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[#CCD0D4] mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-md bg-[#001D48] text-white border border-[#1a3b6d] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] focus:border-transparent"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-[#CCD0D4] mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-md bg-[#001D48] text-white border border-[#1a3b6d] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-[#CCD0D4] mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-md bg-[#001D48] text-white border border-[#1a3b6d] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] focus:border-transparent"
                placeholder="08012345678"
                required
                minLength={11}
                maxLength={14}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium text-[#CCD0D4] mb-2">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-md bg-[#001D48] text-white border border-[#1a3b6d] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] focus:border-transparent"
                placeholder="Street address"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="country" className="block text-sm font-medium text-[#CCD0D4] mb-2">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                readOnly
                className="w-full py-3 px-4 rounded-md bg-[#001D48]/50 text-white border border-[#1a3b6d] cursor-not-allowed"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="state" className="block text-sm font-medium text-[#CCD0D4] mb-2">
                State
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-md bg-[#001D48] text-white border border-[#1a3b6d] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] focus:border-transparent"
                required
              >
                <option value="">Select State</option>
                <option value="Lagos">Lagos</option>
                {/* Add other states if needed */}
              </select>
            </div>

            {formData.state === "Lagos" && (
              <div className="mb-6">
                <label htmlFor="localGovernment" className="block text-sm font-medium text-[#CCD0D4] mb-2">
                  Local Government
                </label>
                <select
                  id="localGovernment"
                  name="localGovernment"
                  value={formData.localGovernment}
                  onChange={handleChange}
                  className="w-full py-3 px-4 rounded-md bg-[#001D48] text-white border border-[#1a3b6d] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] focus:border-transparent"
                  required
                >
                  <option value="">Select Local Government</option>
                  {LAGOS_LOCAL_GOVERNMENTS.map(lga => (
                    <option key={lga} value={lga}>{lga}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="city" className="block text-sm font-medium text-[#CCD0D4] mb-2">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-md bg-[#001D48] text-white border border-[#1a3b6d] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] focus:border-transparent"
                placeholder="Your city"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-[#CCD0D4] mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-3 px-4 rounded-md bg-[#001D48] text-white border border-[#1a3b6d] focus:outline-none focus:ring-2 focus:ring-[#bfdbfe] focus:border-transparent"
                placeholder="••••••••"
                required
                minLength={8}
              />
              <p className="mt-1 text-xs text-[#CCD0D4]">
                Password must contain uppercase, lowercase, and a number
              </p>
            </div>

            <input type="hidden" name="userType" value={formData.userType} />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#bfdbfe] text-[#001D48] font-medium py-3 rounded-md hover:bg-[#9cc2fe] transition-colors"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#CCD0D4]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#bfdbfe] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};