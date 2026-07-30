/**
 * Shared scroll-reveal animation props for the marketing pages.
 * Mirrors the original design's `.rv` effect: fade up 18px over 0.7s,
 * once, triggered a little before the element is fully in view.
 * Spread onto any `motion.*` element: <motion.div {...reveal}>.
 */
export const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -8% 0px' },
  transition: { duration: 0.7, ease: 'easeOut' },
} as const;
