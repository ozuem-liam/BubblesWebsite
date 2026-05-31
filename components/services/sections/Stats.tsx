"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { MaxScreenWrapper } from "../../global/MaxScreen";
import { Text } from "../../global/Text";

const stats = [
  { end: 2000, suffix: "+", label: "Orders Completed" },
  { end: 150,  suffix: "+", label: "Verified Vendors" },
  { end: 20,   suffix: "+", label: "Lagos LCDAs" },
  { end: 4.8,  suffix: "★", label: "Average Rating", decimal: true },
];

function CountUp({
  end,
  suffix,
  decimal,
}: {
  end: number;
  suffix: string;
  decimal?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const steps = 50;
    const stepMs = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(
        decimal
          ? Math.round(end * eased * 10) / 10
          : Math.floor(end * eased)
      );
      if (step >= steps) {
        setCount(end);
        clearInterval(timer);
      }
    }, stepMs);
    return () => clearInterval(timer);
  }, [isInView, end, decimal]);

  return (
    <span ref={ref}>
      {decimal ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

export const Stats: React.FC = () => (
  <div className="lg:px-[2.5rem] xl:px-[5.5rem] px-4 py-[54px] sm:py-[80px] bg-primary800">
    <MaxScreenWrapper>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-2 px-4 lg:border-r last:border-r-0 border-primary600/40"
          >
            <Text
              as="h3"
              style="text-[2.75rem] lg:text-[3.25rem] font-[800] text-tertiary100 leading-none tabular-nums"
            >
              <CountUp end={stat.end} suffix={stat.suffix} decimal={stat.decimal} />
            </Text>
            <Text style="text-[14px] lg:text-[15px] font-[400] text-tertiary700 text-center leading-[1.6] tracking-wide uppercase">
              {stat.label}
            </Text>
          </div>
        ))}
      </div>
    </MaxScreenWrapper>
  </div>
);
