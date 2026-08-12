import { CustomImage } from "../global/Image";
import { StaticImageData } from "next/legacy/image";

interface ILaunderyCard {
  img: StaticImageData;
  step: string;
  title: string;
  desc: string;
}

export const LaunderyCard: React.FC<ILaunderyCard> = ({
  img,
  step,
  title,
  desc,
}) => (
  <article className="md:w-[31%] w-full overflow-hidden rounded-[20px] border border-white/20 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
    <CustomImage src={img} style="h-[300px] lg:h-[420px] w-full" imgStyle="object-cover" />
    <div className="min-h-[148px] bg-white px-6 py-5 text-[#001330]">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary800">{step}</p>
      <h3 className="mt-2 text-[22px] font-bold leading-[1.2]">{title}</h3>
      <p className="mt-3 text-[15px] leading-[1.5] text-tertiary1000">{desc}</p>
    </div>
  </article>
);
