import type { SVGProps } from "react";

export function ArtistSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8m3 15a3 3 0 0 1 4-2.83V11a1 1 0 0 1 1.707-.707l2 2a1 1 0 0 1-1.414 1.414L21 13.414V18a3 3 0 1 1-6 0M3 18a5 5 0 0 1 5-5h5.528a1 1 0 1 1 0 2H8a3 3 0 0 0-3 3a1 1 0 0 0 1 1h6.341a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}
