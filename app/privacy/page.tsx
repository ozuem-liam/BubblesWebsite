import type { Metadata } from "next";
import Link from "next/link";
import { TopNav } from "@/components/global/TopNav";
import { Footer } from "@/components/global/Footer";
import { MaxScreenWrapper } from "@/components/global/MaxScreen";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Bubbles collects, uses, and protects your personal information when you use our cleaning and laundry services platform.",
};

const LAST_UPDATED = "January 1, 2025";
const CONTACT_EMAIL = "williams@bubblesng.com";
const COMPANY_NAME = "Bubbles";
const COMPANY_ADDRESS = "10 Hughes Ave, Alagomeji-Yaba, Lagos 101011, Lagos";

export default function PrivacyPage() {
  return (
    <>
      <div className="bg_linear-gradient lg:px-[2.5rem] xl:px-[5.5rem] px-4 lg:pt-[3rem] pt-[10rem] pb-[3rem]">
        <TopNav />
        <MaxScreenWrapper style="pt-8">
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-tertiary700 mt-2 text-sm">Last updated: {LAST_UPDATED}</p>
        </MaxScreenWrapper>
      </div>

      <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 py-[54px] sm:py-[80px]">
        <MaxScreenWrapper style="max-w-[800px]">
          <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

            <section>
              <p className="text-lg leading-relaxed">
                {COMPANY_NAME} ("we", "our", or "us") operates the Bubbles platform — a
                marketplace connecting customers with cleaning and laundry vendors in Lagos,
                Nigeria. This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our website or mobile applications.
                Please read it carefully.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">a. Information you provide directly</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Name, email address, phone number, and password when you register</li>
                <li>Delivery address and location information when placing an order</li>
                <li>Payment and bank account details for wallet funding or vendor withdrawals</li>
                <li>Identity verification documents (BVN, NIN, or Driver's Licence) for vendors</li>
                <li>Profile photos, shop logos, and cover images uploaded to the platform</li>
                <li>Messages and feedback submitted through the platform</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">b. Information collected automatically</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Device information (device type, operating system, unique device identifiers)</li>
                <li>Log data (IP address, browser type, pages visited, time and date of visits)</li>
                <li>Location data when you use location-based features of our app</li>
                <li>Push notification tokens for delivering order updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Create and manage your account on the Bubbles platform</li>
                <li>Process orders, payments, and withdrawals</li>
                <li>Connect customers with nearby cleaning and laundry vendors</li>
                <li>Send order status updates, OTP codes, and service notifications</li>
                <li>Verify vendor identity and eligibility to operate on the platform</li>
                <li>Provide customer support and respond to enquiries</li>
                <li>Improve our services through analytics and feedback</li>
                <li>Detect and prevent fraud, abuse, and security incidents</li>
                <li>Comply with applicable Nigerian laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. How We Share Your Information</h2>
              <p className="mb-3">We do not sell your personal information. We may share it with:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>
                  <strong>Vendors</strong> — your name, phone number, and delivery address are
                  shared with the vendor fulfilling your order so they can complete the service.
                </li>
                <li>
                  <strong>Payment processors</strong> — Paystack processes payments and may
                  receive your payment details subject to their own privacy policy.
                </li>
                <li>
                  <strong>Push notification providers</strong> — OneSignal delivers push
                  notifications to your device using your device token.
                </li>
                <li>
                  <strong>Cloud storage providers</strong> — uploaded images are stored securely
                  with Cloudinary or Microsoft Azure.
                </li>
                <li>
                  <strong>Legal authorities</strong> — when required by law, court order, or to
                  protect the rights and safety of our users or the public.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Data Retention</h2>
              <p className="leading-relaxed">
                We retain your personal information for as long as your account is active or as
                needed to provide services. If you close your account, we may retain certain
                information for up to 7 years to comply with legal, tax, and financial
                obligations. Order and transaction records are retained in line with Nigerian
                financial regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organisational measures to protect your
                personal information against unauthorised access, loss, or disclosure. Sensitive
                data such as authentication tokens are stored in encrypted form. Payment
                processing is handled by PCI-DSS compliant third-party providers. However, no
                method of transmission over the internet is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of your account and personal data</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Withdraw consent for location access through your device settings</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline">
                  {CONTACT_EMAIL}
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Children's Privacy</h2>
              <p className="leading-relaxed">
                Bubbles is not intended for use by persons under the age of 18. We do not
                knowingly collect personal information from minors. If you believe a minor has
                provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Third-Party Links</h2>
              <p className="leading-relaxed">
                Our platform may contain links to third-party websites or services. We are not
                responsible for the privacy practices of those sites and encourage you to review
                their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of
                significant changes by posting the new policy on this page and updating the
                "Last updated" date. Continued use of the platform after changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions or concerns about this Privacy Policy, please contact us:
              </p>
              <div className="mt-3 space-y-1">
                <p><strong>{COMPANY_NAME}</strong></p>
                <p>{COMPANY_ADDRESS}</p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </section>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <Link href="/" className="text-blue-600 underline text-sm">
                ← Back to Home
              </Link>
            </div>

          </div>
        </MaxScreenWrapper>
      </div>

      <Footer />
    </>
  );
}
