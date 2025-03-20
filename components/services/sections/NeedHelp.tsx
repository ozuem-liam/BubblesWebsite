import { MaxScreenWrapper } from "@/components/global/MaxScreen";
import { Text } from "@/components/global/Text";
import bubble from "../../../public/bubbles.png";
import { CustomImage } from "@/components/global/Image";
import { CallSvg, SendSvg, SocialSvg, WhatsappSvg } from "@/components/svgs";
import { RevealAnimation } from "@/components/global/Reveal";

interface IHelpCard {
  icon: React.ReactNode;
  title: string;
}

const HelpCard: React.FC<IHelpCard> = ({ icon, title }) => (
  <div className="cursor-pointer bg-primaryBubbly justify-center rounded w-[200px] h-[160px] flex gap-[10px] flex-col items-center">
    {icon}
    <Text style="text-[20px] font-[500]">{title}</Text>
  </div>
);

export const NeedHelp: React.FC = () => {
  return (
    <div className="sm:px-[2.5rem] px-4  py-[54px]">
      <MaxScreenWrapper style="relative flex flex-col md:gap-[80px] gap-[40px]">
        <CustomImage
          src={bubble}
          style="md:w-[370px] w-[300px] h-[330px] absolute top-[10px] left-[10px]"
          imgStyle="object-cover"
        />
        <div className="flex flex-col w-full md:gap-[30px] gap-[0px]">
          <RevealAnimation style="w-full">
            <Text
              as="h1"
              style="font-[700] text-[34px] leading-[160%] md:text-start text-center"
            >
              Need Help?
            </Text>
          </RevealAnimation>
          <RevealAnimation style="w-fit">
            <Text
                id="contact"
              as="h2"
              style="font-[400] text-[22px] leading-[140%] text-tertiary1000 md:text-start text-center"
            >
              Easily contact us through the most convenient channel for you.
            </Text>
          </RevealAnimation>
        </div>
        <div className="w-full gap-[20px] flex flex-wrap md:justify-between justify-center items-center">
          <RevealAnimation style="w-fit">
            <HelpCard icon={<WhatsappSvg />} title={"Whatsapp"} />
          </RevealAnimation>
          <RevealAnimation style="w-fit">
            <HelpCard icon={<CallSvg />} title={"Phone support"} />
          </RevealAnimation>
          <RevealAnimation style="w-fit">
            <HelpCard icon={<SendSvg />} title={"Email"} />
          </RevealAnimation>
          <RevealAnimation style="w-fit">
            <HelpCard icon={<SocialSvg />} title={"Social"} />
          </RevealAnimation>
        </div>
      </MaxScreenWrapper>
    </div>
  );
};
