import type { SVGProps } from "react";

export function PauseButtonSvg(props: SVGProps<SVGSVGElement>) {
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
        d="M10 16q.425 0 .713-.288T11 15V9q0-.425-.288-.712T10 8t-.712.288T9 9v6q0 .425.288.713T10 16m4 0q.425 0 .713-.288T15 15V9q0-.425-.288-.712T14 8t-.712.288T13 9v6q0 .425.288.713T14 16m-2 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      ></path>
    </svg>
  );
}
