import * as React from "react";
import { SVGProps } from "react";

const XSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={60}
    viewBox="0 0 1200 1400"
    fill="none"
    {...props}
  >
    <path
      fill="black"
      d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
    />
  </svg>
);
export default XSVG;
