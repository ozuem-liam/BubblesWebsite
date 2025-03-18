"use client";

import Brand from "../../public/bubbles-logo.png";
import { CustomImage } from "./Image";
import { cn } from "@/lib/utils";
import { useRouter } from "nextjs-toploader/app";

interface ILogoPropType {
  style?: string;
}

export const Logo: React.FC<ILogoPropType> = ({ style }: ILogoPropType) => {
  const router = useRouter();

  return (
    <CustomImage
      src={Brand}
      style={cn("w-[113px] h-[80px] cursor-pointer", style)}
      imgStyle="object-cover"
      priority={true}
      clickFunc={() => router.push("/")}
    />
  );
};
