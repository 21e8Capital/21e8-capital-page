import * as React from "react";
import { SVGProps } from "react";

const Burger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g stroke="#000" strokeLinecap="round" strokeWidth={1.08}>
      <path d="M5 12h13M5 17h6M5 7h10" />
    </g>
  </svg>
);
export default Burger;
