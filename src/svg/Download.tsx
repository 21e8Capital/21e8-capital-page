import * as React from "react";
import { SVGProps } from "react";

const Download = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#EAEAEA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M8.063 10.313 12 14.25l3.938-3.937M12 3.75v10.497M20.25 14.25v5.25a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-5.25"
    />
  </svg>
);
export default Download;
