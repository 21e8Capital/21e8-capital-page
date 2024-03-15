import { useTheme } from "next-themes";
import * as React from "react";
import { SVGProps } from "react";

const LinkedIn = (props: SVGProps<SVGSVGElement>) => {
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
        fill={resolvedTheme === "light" ? "#3F3C3C" : "#fff"}
        d="M0 21C0 9.402 9.402 0 21 0s21 9.402 21 21-9.402 21-21 21S0 32.598 0 21Z"
      />
      <path
        fill={resolvedTheme === "light" ? "#fff" : "#3F3C3C"}
        fillRule="evenodd"
        d="M15.154 12.97c0 1.373-1.034 2.471-2.693 2.471h-.03c-1.598 0-2.631-1.098-2.631-2.471 0-1.402 1.064-2.47 2.692-2.47 1.628 0 2.63 1.068 2.662 2.47Zm-.314 4.423v14.3h-4.759v-14.3h4.76Zm17.163 14.3v-8.2c0-4.391-2.348-6.436-5.48-6.436-2.526 0-3.657 1.388-4.289 2.362v-2.026h-4.76c.063 1.342 0 14.3 0 14.3h4.76v-7.986c0-.428.031-.854.157-1.16.344-.854 1.127-1.738 2.442-1.738 1.723 0 2.411 1.312 2.411 3.233v7.65h4.76Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default LinkedIn;
