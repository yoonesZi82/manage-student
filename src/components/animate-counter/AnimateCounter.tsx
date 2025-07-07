import { useEffect, useState } from "react";
import { animate, useMotionValue } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";

function AnimatedCounter({
  to = 100,
  duration = 2,
  className,
  isPrice = true,
}: {
  to: number;
  duration?: number;
  className?: string;
  isPrice?: boolean;
}) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      onUpdate: (latest) => {
        setDisplay(Math.round(latest));
      },
    });
    return controls.stop;
  }, [to, duration, count]);

  return (
    <span className={cn(className)}>
      {isPrice ? formatPrice(display) : display}
    </span>
  );
}

export default AnimatedCounter;
