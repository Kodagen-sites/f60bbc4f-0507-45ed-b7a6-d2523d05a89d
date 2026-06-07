import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * ScrollReveal — wrap any section to fade/slide it in on scroll.
 *
 * Implements rule 33.3 — minimum 3 scroll-triggered animations per page.
 *
 * Usage:
 *
 *   <ScrollReveal>
 *     <section>...</section>
 *   </ScrollReveal>
 *
 *   <ScrollReveal direction="left" delay={0.1}>
 *     <h2>...</h2>
 *   </ScrollReveal>
 *
 * Trigger fires once when 30% of the element enters viewport (configurable).
 *
 * For staggered children, use ScrollRevealStagger with index prop.
 */

type Direction = "up" | "down" | "left" | "right" | "fade";

type Props = {
  children: ReactNode;
  direction?: Direction;
  delay?: number;          // seconds
  duration?: number;       // seconds
  amount?: number;          // 0-1, viewport overlap to trigger (default 0.3)
  once?: boolean;           // default true — fire once and stay visible
  className?: string;
};

const directionMap: Record<Direction, { x?: number; y?: number }> = {
  up:    { y: 32 },
  down:  { y: -32 },
  left:  { x: 32 },
  right: { x: -32 },
  fade:  {},
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  amount = 0.3,
  once = true,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount, once });
  const offset = directionMap[direction];
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollRevealStagger — for children that should animate in sequence.
 *
 * Usage:
 *
 *   {items.map((item, i) => (
 *     <ScrollRevealStagger index={i} key={item.id}>
 *       <Card {...item} />
 *     </ScrollRevealStagger>
 *   ))}
 */
export function ScrollRevealStagger({
  children,
  index,
  baseDelay = 0,
  stagger = 0.08,
  ...rest
}: Props & { index: number; baseDelay?: number; stagger?: number }) {
  return (
    <ScrollReveal {...rest} delay={baseDelay + index * stagger}>
      {children}
    </ScrollReveal>
  );
}
