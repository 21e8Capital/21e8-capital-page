import { useTheme } from "next-themes";
import * as React from "react";
import { SVGProps } from "react";

const Anchor = (props: SVGProps<SVGSVGElement>) => {
  const { resolvedTheme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      {...props}
    >
      <path
        stroke={resolvedTheme === "dark" ? "#EAEAEA" : "#0d0d0d"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="m13 6-5 5-5-5"
      />
    </svg>
  );
};

export default Anchor;
