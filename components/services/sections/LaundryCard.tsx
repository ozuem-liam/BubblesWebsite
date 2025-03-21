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
    style="w-full h-[450px] lg:h-[610px]"
    imgStyle="object-contain"
  />
);
