import { useTheme } from "next-themes";
import * as React from "react";
import { SVGProps } from "react";

const Close = (props: SVGProps<SVGSVGElement>) => {
  const { resolvedTheme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={33}
      fill="none"
      {...props}
    >
      <path
        stroke={resolvedTheme === "dark" ? "#EAEAEA" : "#0d0d0d"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m25 7.5-18 18M25 25.5 7 7.5"
      />
    </svg>
  );
};

export default Close;
