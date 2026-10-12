import { WORDMARK_LETTERS, WORDMARK_VIEWBOX } from "./wordmark-paths";

// Outlined "Wordmark/Regular" master from the brand Figma file, inlined so it
// takes currentColor (Ink on Ivory, Ivory on Estate Green — nothing else).
export default function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      role="img"
      aria-label="cazlae"
      fill="currentColor"
      className={className}
    >
      <path d={WORDMARK_LETTERS.join("")} />
    </svg>
  );
}
