import { CustomImage } from "../global/Image";
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
    style="md:w-[31%] w-full h-[450px] lg:h-[610px]"
    imgStyle="object-contain"
  />
);
