import { cn } from "@/lib/utils";

interface IMaxScreenWrapperPropType {
  children: React.ReactNode;
  style?: string;
}

export const MaxScreenWrapper: React.FC<IMaxScreenWrapperPropType> = ({
  style,
  children,
}: IMaxScreenWrapperPropType) => {
  return <div className={cn("m-auto max-w-[1440px]", style)}>{children}</div>;
};
