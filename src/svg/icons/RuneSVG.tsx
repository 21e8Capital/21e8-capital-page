import * as React from "react";
import { SVGProps } from "react";

const RuneSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={100}
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      d="M100 50c0 27.614-22.386 50-50 50S0 77.614 0 50 22.386 0 50 0s50 22.386 50 50Z"
    />
    <path
      fill="#fff"
      d="M49.5 49.5 63 63 21 79l28.5-29.5ZM37.5 37 78 22 49.5 49.5 37.5 37Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={20.5}
        x2={86}
        y1={87}
        y2={16}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2BF7A9" />
        <stop offset={1} stopColor="#08D4EE" />
      </linearGradient>
    </defs>
  </svg>
);
export default RuneSVG;
