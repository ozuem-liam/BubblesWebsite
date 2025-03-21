import { CustomImage } from "@/components/global/Image";
import { StaticImageData } from "next/legacy/image";

interface ILaunderyCard {
  img: StaticImageData;
}

export const LaunderyCard: React.FC<ILaunderyCard> = ({
  img,
  // , title, desc
}) => (
  <CustomImage
    src={img}
    style="w-full h-[360px] md:h-[610px] sm:h-[496px]"
    imgStyle="object-contain"
  />
);
