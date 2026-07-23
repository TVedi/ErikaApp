import type { SVGProps } from "react";

type PremiumIconProps = SVGProps<SVGSVGElement>;

/** Engraved trophy — cup, handles, stem, base. */
export function PremiumTrophy({
  "aria-hidden": ariaHidden = true,
  ...props
}: PremiumIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      aria-hidden={ariaHidden}
    >
      <path d="M7 4h10v3.2c0 3.5-2 6.4-5 7.8-3-1.4-5-4.3-5-7.8V4Z" />
      <path d="M7 6H5.5C4.1 6 3 7.1 3 8.5c0 2 1.5 3.7 3.5 4" />
      <path d="M17 6h1.5C19.9 6 21 7.1 21 8.5c0 2-1.5 3.7-3.5 4" />
      <path d="M12 15v3" />
      <path d="M9 18h6" />
      <path d="M8 21h8" />
    </svg>
  );
}

/** Engraved medal — ribbon + star disc. */
export function PremiumMedal({
  "aria-hidden": ariaHidden = true,
  ...props
}: PremiumIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      aria-hidden={ariaHidden}
    >
      <path d="M8 3h8l-2.5 4h-3L8 3Z" />
      <path d="M10.5 7 9 9" />
      <path d="M13.5 7 15 9" />
      <circle cx="12" cy="14" r="5.5" />
      <path d="m12 10.8.9 2 2.2.2-1.7 1.4.5 2.1-1.9-1.1-1.9 1.1.5-2.1-1.7-1.4 2.2-.2.9-2Z" />
    </svg>
  );
}

/** Engraved crown — peaks, band, base. */
export function PremiumCrown({
  "aria-hidden": ariaHidden = true,
  ...props
}: PremiumIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      aria-hidden={ariaHidden}
    >
      <path d="M4 17 5.5 7 9 11l3-6 3 6 3.5-4L20 17H4Z" />
      <path d="M5 17h14" />
      <path d="M6 20h12" />
      <path d="M8.5 14h7" />
      <path d="M12 5v-1" />
    </svg>
  );
}

/** Engraved multi-point star with cross rays. */
export function PremiumStar({
  "aria-hidden": ariaHidden = true,
  ...props
}: PremiumIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      aria-hidden={ariaHidden}
    >
      <path d="m12 3 1.7 6.3L20 12l-6.3 2.7L12 21l-1.7-6.3L4 12l6.3-2.7L12 3Z" />
      <path d="m12 7 .9 4.1L17 12l-4.1.9L12 17l-.9-4.1L7 12l4.1-.9L12 7Z" />
      <path d="M12 1.5v1" />
      <path d="M12 21.5v1" />
      <path d="M1.5 12h1" />
      <path d="M21.5 12h1" />
    </svg>
  );
}

/** Engraved globe — meridians and parallels. */
export function PremiumGlobe({
  "aria-hidden": ariaHidden = true,
  ...props
}: PremiumIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      aria-hidden={ariaHidden}
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M5 8.2c2 .8 4.4 1.2 7 1.2s5-.4 7-1.2" />
      <path d="M5 15.8c2-.8 4.4-1.2 7-1.2s5 .4 7 1.2" />
      <path d="M12 3.5c-2.2 2.1-3.4 5.1-3.4 8.5s1.2 6.4 3.4 8.5" />
      <path d="M12 3.5c2.2 2.1 3.4 5.1 3.4 8.5s-1.2 6.4-3.4 8.5" />
    </svg>
  );
}

/** Engraved flag — pole, banner, finial. */
export function PremiumFlag({
  "aria-hidden": ariaHidden = true,
  ...props
}: PremiumIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      aria-hidden={ariaHidden}
    >
      <path d="M6 21V4" />
      <path d="M6 5h10l-2 3 2 3H6" />
      <path d="M4.5 21h3" />
      <path d="M5.2 3 6 2l.8 1L6 4l-.8-1Z" />
      <path d="M9 14h5" />
    </svg>
  );
}
