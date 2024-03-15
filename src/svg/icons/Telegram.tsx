import { useTheme } from "next-themes";
import * as React from "react";
import { SVGProps } from "react";

const Telegram = (props: SVGProps<SVGSVGElement>) => {
  const { resolvedTheme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={42}
      height={42}
      fill="none"
      {...props}
    >
      <path
        fill="url(#a)"
        d="M21 42c11.598 0 21-9.402 21-21S32.598 0 21 0 0 9.402 0 21s9.402 21 21 21Z"
      />
      <path
        fill="#3E3C3C"
        d="M7.82 22.027c2.456-1.352 5.196-2.48 7.757-3.615 4.405-1.858 8.827-3.684 13.294-5.383.87-.29 2.43-.573 2.584.715-.084 1.823-.429 3.635-.665 5.448-.601 3.986-1.295 7.958-1.972 11.93-.233 1.324-1.89 2.009-2.951 1.162-2.55-1.722-5.118-3.427-7.635-5.189-.824-.837-.06-2.04.677-2.638 2.1-2.07 4.326-3.827 6.315-6.003.537-1.296-1.049-.204-1.572.13-2.874 1.981-5.678 4.083-8.708 5.824-1.548.852-3.352.124-4.9-.352-1.387-.574-3.42-1.153-2.223-2.029Z"
      />
      <defs>
        <linearGradient
          id="a"
          x1={28.002}
          x2={17.502}
          y1={7.001}
          y2={31.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={0.935} stopColor="#fff" />
          <stop offset={1} stopColor="#fff" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Telegram;
