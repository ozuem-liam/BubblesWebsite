import { MaxScreenWrapper } from "@/components/global/MaxScreen";
import { Text } from "@/components/global/Text";
import { Accordium } from "./FaqAccordium";
import bubble from "../../../public/bubbles.png";
import { CustomImage } from "@/components/global/Image";
import { useEffect, useState } from "react";
import { customerTab } from "..";

interface IFAQ {
  activeTab: string;
}

const customerFaq = [
  {
    title: "Is Bubbles available in my area?",
    answer:
      "Our consulting services focus on delivering tailor-made solutions that address your unique business challenges and opportunities thus providing strategic guidance to help you navigate your digital transformation journey.",
  },
  {
    title: "Is Bubbles available in my area?",
    answer: "Can I wash other things asides from clothes?",
  },
  {
    title: "Can I reschedule or cancel a pickup?",
    answer:
      "Our consulting services focus on delivering tailor-made solutions that address your unique business challenges and opportunities thus providing strategic guidance to help you navigate your digital transformation journey.",
  },
  {
    title: "Who do I contact for support?",
    answer:
      "Our consulting services focus on delivering tailor-made solutions that address your unique business challenges and opportunities thus providing strategic guidance to help you navigate your digital transformation journey.",
  },
  {
    title: "How much is delivery?",
    answer:
      "Our consulting services focus on delivering tailor-made solutions that address your unique business challenges and opportunities thus providing strategic guidance to help you navigate your digital transformation journey.",
  },
];

const vendorFaq = [
  {
    title: "How does Bubbles help my business?",
    answer:
      "Our consulting services focus on delivering tailor-made solutions that address your unique business challenges and opportunities thus providing strategic guidance to help you navigate your digital transformation journey.",
  },
  {
    title: "What do I need to get started?",
    answer:
      "Our consulting services focus on delivering tailor-made solutions that address your unique business challenges and opportunities thus providing strategic guidance to help you navigate your digital transformation journey.",
  },
  {
    title: "How do I receive payments?",
    answer:
      "Our consulting services focus on delivering tailor-made solutions that address your unique business challenges and opportunities thus providing strategic guidance to help you navigate your digital transformation journey.",
  },
  {
    title: "Can I set my own prices?",
    answer:
      "Our consulting services focus on delivering tailor-made solutions that address your unique business challenges and opportunities thus providing strategic guidance to help you navigate your digital transformation journey.",
  },
  {
    title: "How do I withdraw my business profits?",
    answer:
      "Our consulting services focus on delivering tailor-made solutions that address your unique business challenges and opportunities thus providing strategic guidance to help you navigate your digital transformation journey.",
  },
  {
    title: "Do I need to pay for my shop visibility?",
    answer:
      "Our consulting services focus on delivering tailor-made solutions that address your unique business challenges and opportunities thus providing strategic guidance to help you navigate your digital transformation journey.",
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
    <div className="lg:px-[2.5rem] px-4  py-[104px]">
      <MaxScreenWrapper style="relative flex md:flex-row flex-col md:gap-[80px] gap-[40px]">
        <CustomImage
          src={bubble}
          style="md:w-[370px] w-[300px] h-[330px] absolute top-[10px] left-[10px]"
          imgStyle="object-cover"
        />
        <div
          id="faq"
          className="flex flex-col md:w-[30%] w-full md:gap-[30px] gap-[0px]"
        >
          <Text
            as="h1"
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
