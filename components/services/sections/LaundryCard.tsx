import { CustomImage } from "@/components/global/Image";
import { StaticImageData } from "next/legacy/image";

interface ILaunderyCard {
  img: StaticImageData;
}

export const LaunderyCard: React.FC<ILaunderyCard> = ({
  img,
  // , title, desc
}) => (
  <div className="p-[12px] rounded-[12px] border border-[#2B5AA2] flex flex-col gap-0">
    <div className="">
      <CustomImage
        src={img}
        style="w-full md:h-[610px] h-[496px]"
        imgStyle="object-contain "
      />
    </div>
  </div>
);
