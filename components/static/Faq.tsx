import { MaxScreenWrapper } from "../global/MaxScreen";
import { Text } from "../global/Text";
import { Accordium } from "./FaqAccordium";
import bubble from "../../public/bubbles.png";
import { CustomImage } from "../global/Image";
import { useEffect, useState } from "react";
import { customerTab } from ".";

interface IFAQ {
  activeTab: string;
}

const customerFaq = [
  {
    title: "Is Bubbles available in my area?",
    answer: "Bubbles is currently active in more than 20 LCDAs across Lagos.",
  },
  {
    title: "What does Bubbles do?",
    answer:
      "Bubbles is a marketplace. We connect customers with independent service professionals, help manage service requests, and provide support when a booking needs attention. The selected vendor provides the service.",
  },
  {
    title: "Who do I contact for support?",
    answer: `
    Email us at 
    <a class="text-primary500 underline hover:text-primary700" href="mailto:williams@bubblesng.com">
      williams@bubblesng.com
    </a> 
    or call 
    <a class="text-primary500 underline hover:text-primary700" href="tel:+2348105951215">
      +234 810 595 1215
    </a>.
  `,
  },
  {
    title: "What if there is a problem with my booking?",
    answer:
      "Contact Bubbles support as soon as possible. We will review the information available and help you and the vendor follow the relevant platform policies toward a fair resolution.",
  },
];

const vendorFaq = [
  {
    title: "How does Bubbles help my business?",
    answer:
      "Bubbles helps independent service businesses reach customers, manage requests, and keep their marketplace profile organised. You remain in control of the services you offer, your pricing, availability, and fulfilment.",
  },
  {
    title: "What do I need to get started?",
    answer: `Register Your Business – Sign up on the Bubbles platform and provide basic details about your service business.

      Set Up Your Profile – Add your pricing, service offerings, and business location so customers can find you easily.
      
      Verify Your Business – Complete a quick verification process to ensure trust and quality service on our platform.
      
      Start Receiving Orders – Once approved, you can begin accepting customer requests and growing your business with Bubbles!
      
      Need help? Our team is available to guide you through the onboarding process.`,
  },
  {
    title: "How do I receive payments?",
    answer: `Bubbles ensures a seamless and secure payment process for your business. Here’s how you receive payments:

      Customers Pay Online – When a customer places an order, payment is processed through the Bubbles app where available.
      
      Funds Are Processed According to the Platform Flow – The applicable payment and payout status is shown in your vendor account.
      
      Payouts to Your Account – After completing an order, your earnings are automatically transferred to your registered bank account or wallet on Bubbles.
      
      Track Your Earnings – You can monitor all transactions and payouts through your vendor dashboard for full transparency.
      
      Bubbles makes sure you get paid on time, hassle-free!`,
  },
  {
    title: "Can I set my own prices?",
    answer:
      "Yes. You control the prices for the services you choose to offer, based on your business model, service requirements, and availability. Make sure your profile clearly explains what each price includes.",
  },
  {
    title: "How do I withdraw my business profits?",
    answer: `With Bubbles, withdrawing your business profits is simple and hassle-free!

      Verify Your Bank Account – Add and verify the bank account where you want to receive your withdrawals. This ensures secure and seamless transactions.
      
      Earn from Completed Orders – Once you complete an order, your earnings will be added to your Bubbles wallet.
      
      Withdraw with One Click – When you're ready, simply click the withdraw button, and your funds will be transferred to your verified bank account instantly or within a short processing time.
      
      Bubbles makes it easy for you to access your earnings whenever you need them! `,
  },
  {
    title: "Do I need to pay for my shop visibility?",
    answer: `No, you don’t need to pay for basic shop visibility on Bubbles! Your business will be listed on the platform for customers to find and place orders.

      However, if you want to boost your visibility and attract more customers, we offer optional promoted listings and premium features that can help your shop stand out. These may include:
      
      ✅ Featured Placement – Appear at the top of search results.
      ✅ Targeted Promotions – Reach more customers in your area.
      ✅ Exclusive Marketing Support – Get access to special campaigns to increase orders.
      
      But don’t worry—without any extra cost, you can still get customers and grow your business on Bubbles! `,
  },
];

export const FAQ: React.FC<IFAQ> = ({ activeTab }) => {
  const [activeFaq, setActiveFaq] =
    useState<{ title: string; answer: string }[]>(customerFaq);
  useEffect(() => {
    setActiveFaq(() => {
      if (activeTab === customerTab) return customerFaq;
      return vendorFaq;
    });
  }, [activeTab]);
  return (
    <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4  py-[54px] sm:py-[104px]">
      <MaxScreenWrapper style="relative flex md:flex-row flex-col md:gap-[80px] gap-[40px]">
        <CustomImage
          src={bubble}
          style="md:w-[370px] w-[288px] h-[330px] absolute top-[10px] left-[10px]"
          imgStyle="object-cover"
        />
        <div
          id="faq"
          className="flex flex-col md:w-[30%] w-full md:gap-[30px] gap-[0px]"
        >
          <Text
            as="h2"
            style="font-[700] text-[34px] leading-[160%] md:text-start text-center"
          >
            FAQs
          </Text>
          <Text
            as="h2"
            style="font-[400] text-[22px] leading-[140%] text-tertiary1000 md:text-start text-center"
          >
            {`You've got questions? we've got answers for you`}
          </Text>
        </div>
        <div className="bg-primaryBubbly rounded-[12px] md:px-[40px] px-[20px] py-[10px] flex flex-col divide-y divide-[gainsboro] md:w-[80%] w-full">
          {activeFaq?.map((faq, index) => (
            <Accordium key={index} title={faq.title} info={faq.answer} />
          ))}
        </div>
      </MaxScreenWrapper>
    </div>
  );
};
