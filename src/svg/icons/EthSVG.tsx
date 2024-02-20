import * as React from "react";
import { SVGProps } from "react";

const EthSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={105}
    height={105}
    fill="none"
    {...props}
  >
    <g fill="#000">
      <path
        fillRule="evenodd"
        d="M52.313 104.625C23.42 104.625 0 81.205 0 52.313 0 23.42 23.42 0 52.313 0c28.892 0 52.312 23.42 52.312 52.313 0 28.892-23.42 52.312-52.312 52.312Zm26.136-51.596-24.508-39.95-24.515 39.953L53.94 67.264 78.449 53.03Zm.02 4.567L53.94 71.822 29.426 57.599 53.94 91.531l24.528-33.935Z"
        clipRule="evenodd"
      />
      <path
        fillOpacity={0.298}
        d="M53.94 13.078v29l24.513 10.954L53.94 13.078Zm0 58.747v19.706L78.47 57.596 53.94 71.826Z"
      />
      <path
        fillOpacity={0.801}
        d="m53.94 67.264 24.513-14.232L53.94 42.086v25.178Z"
      />
      <path
        fillOpacity={0.298}
        d="M29.426 53.032 53.94 67.264V42.086L29.426 53.032Z"
      />
    </g>
  </svg>
);
export default EthSVG;
