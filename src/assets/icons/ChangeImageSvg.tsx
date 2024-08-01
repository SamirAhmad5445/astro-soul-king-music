import type { SVGProps } from "react";

export function ChangeImageSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="4"
      >
        <path d="M38 21v19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h18.364"></path>
        <path d="M12 31.03L18 23l3 3l3.5-5.5L32 31.03zM34 10h8m-4.005-4.205v8"></path>
      </g>
    </svg>
  );
}
