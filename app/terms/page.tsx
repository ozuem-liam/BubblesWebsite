import type { Metadata } from "next";
import Link from "next/link";
import { TopNav } from "@/components/global/TopNav";
import { Footer } from "@/components/global/Footer";
import { MaxScreenWrapper } from "@/components/global/MaxScreen";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Bubbles Terms of Service governing your use of our cleaning and laundry services marketplace.",
};

const LAST_UPDATED = "January 1, 2025";
const CONTACT_EMAIL = "williams@bubblesng.com";
const COMPANY_NAME = "Bubbles";

export default function TermsPage() {
  return (
    <>
      <div className="bg_linear-gradient lg:px-[2.5rem] xl:px-[5.5rem] px-4 lg:pt-[3rem] pt-[10rem] pb-[3rem]">
        <TopNav />
        <MaxScreenWrapper style="pt-8">
          <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
          <p className="text-tertiary700 mt-2 text-sm">Last updated: {LAST_UPDATED}</p>
        </MaxScreenWrapper>
      </div>

      <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 py-[54px] sm:py-[80px]">
        <MaxScreenWrapper style="max-w-[800px]">
          <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

            <section>
              <p className="text-lg leading-relaxed">
                Welcome to {COMPANY_NAME}. By accessing or using our platform — including the
                website, customer app, and vendor app — you agree to be bound by these Terms of
                Service. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. The Bubbles Platform</h2>
              <p className="leading-relaxed">
                Bubbles is an online marketplace that connects customers seeking cleaning and
                laundry services with independent vendors who provide those services. Bubbles
                itself is a technology platform — we do not perform cleaning services directly.
                Vendors are independent businesses responsible for the quality of their services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Eligibility</h2>
              <p className="leading-relaxed">
                You must be at least 18 years old to use Bubbles. By creating an account, you
                confirm that you are 18 or older and that the information you provide is
                accurate and complete. We reserve the right to suspend or terminate accounts
                that provide false information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Customer Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Provide accurate delivery addresses and contact information</li>
                <li>Be available at the scheduled pickup and delivery times</li>
                <li>Safeguard your OTP codes — these are required to confirm pickup and collection</li>
                <li>Pay for services as agreed at the time of order</li>
                <li>Treat vendors and riders with respect</li>
                <li>Report any issues with service quality promptly through the app</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Vendor Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Complete identity verification before going live on the platform</li>
                <li>Maintain sufficient wallet balance to receive and fulfil orders</li>
                <li>Provide services to the standard described in your shop profile</li>
                <li>Verify customer OTPs at pickup and collection to confirm service completion</li>
                <li>Respond to orders in a timely manner</li>
                <li>Comply with all applicable Nigerian laws regarding business operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Payments and Wallet</h2>
              <p className="leading-relaxed mb-3">
                Payments on Bubbles are processed through Paystack. By using our payment
                features, you agree to Paystack's terms of service. Vendors receive earnings in
                their Bubbles wallet after order completion. Withdrawals are transferred to the
                vendor's verified bank account.
              </p>
              <p className="leading-relaxed">
                Bubbles does not charge customers a platform fee at this time. Vendor
                transaction fees, if applicable, will be communicated separately. All prices
                are displayed in Nigerian Naira (NGN).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Cancellations and Refunds</h2>
              <p className="leading-relaxed mb-3">
                Customers may cancel an order before the vendor has accepted it. Once a vendor
                accepts an order and pickup has been confirmed via OTP, cancellation may not be
                possible. Refund eligibility depends on the stage of the order and the reason
                for cancellation.
              </p>
              <p className="leading-relaxed">
                If a service is not delivered as described, please contact us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline">
                  {CONTACT_EMAIL}
                </a>{" "}
                within 24 hours of the scheduled delivery. We will investigate and, where
                appropriate, facilitate a refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Prohibited Conduct</h2>
              <p className="mb-3">You may not:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Use the platform for any unlawful purpose</li>
                <li>Impersonate another person or entity</li>
                <li>Manipulate reviews or ratings</li>
                <li>Circumvent the OTP verification process</li>
                <li>Attempt to take transactions off-platform to avoid fees</li>
                <li>Harass, threaten, or abuse other users of the platform</li>
                <li>Use automated tools to access the platform without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content on the Bubbles platform — including the logo, design, text, and
                software — is the property of {COMPANY_NAME} or its licensors and is protected
                by Nigerian and international intellectual property laws. You may not copy,
                reproduce, or distribute any part of the platform without our express written
                permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Limitation of Liability</h2>
              <p className="leading-relaxed">
                Bubbles provides a technology marketplace and is not liable for the quality,
                safety, or legality of services provided by vendors. To the maximum extent
                permitted by Nigerian law, Bubbles shall not be liable for any indirect,
                incidental, or consequential damages arising from your use of the platform.
                Our total liability for any claim shall not exceed the amount you paid for
                the specific order giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Termination</h2>
              <p className="leading-relaxed">
                We reserve the right to suspend or terminate your account at any time if you
                breach these Terms or if we determine that your use of the platform is harmful
                to other users or to Bubbles. You may close your account at any time by
                contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">11. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms are governed by the laws of the Federal Republic of Nigeria. Any
                disputes arising from these Terms shall be subject to the exclusive jurisdiction
                of the courts of Lagos State, Nigeria.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">12. Changes to These Terms</h2>
              <p className="leading-relaxed">
                We may revise these Terms from time to time. We will notify you of material
                changes by updating this page and, where appropriate, by sending you an email
                or in-app notification. Continued use of the platform after changes constitutes
                acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">13. Contact Us</h2>
              <p className="leading-relaxed">
                Questions about these Terms? Contact us at:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </section>

            <div className="border-t border-gray-200 pt-6 mt-8 flex gap-6">
              <Link href="/" className="text-blue-600 underline text-sm">
                ← Back to Home
              </Link>
              <Link href="/privacy" className="text-blue-600 underline text-sm">
                Privacy Policy →
              </Link>
            </div>

          </div>
        </MaxScreenWrapper>
      </div>

      <Footer />
    </>
  );
}
