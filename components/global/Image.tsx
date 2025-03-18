"use client";
import { cn } from "@/lib/utils";
import Image from "next/legacy/image";
import { useState } from "react";
import { StaticImageData } from "next/legacy/image";

interface ICustomImagePropType {
  src: StaticImageData;
  alt?: string;
  imgStyle?: string;
  priority?: boolean;
  clickFunc?: () => void;
  style: string;
}

export const CustomImage: React.FC<ICustomImagePropType> = ({
  src,
  alt = "object not found",
  style,
  imgStyle,
  priority = false,
  clickFunc,
}: ICustomImagePropType) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className={cn("relative", style)} onClick={clickFunc && clickFunc}>
      {isLoading && (
        <div
          className={cn("w-full animate-pulse bg-tertiary300", style, imgStyle)}
        ></div>
      )}
      <Image
        src={src}
        alt={alt}
        className={cn("w-full", imgStyle)}
        onLoadingComplete={() => setIsLoading(false)}
        layout="fill"
        priority={priority}
      />
    </div>
  );
};
