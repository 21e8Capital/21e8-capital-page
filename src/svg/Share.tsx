import * as React from "react";
import { SVGProps } from "react";
import { useTheme } from "next-themes";

const Share = (props: SVGProps<SVGSVGElement>) => {
  const { resolvedTheme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <path
        stroke={resolvedTheme === "dark" ? "#EAEAEA" : "#0d0d0d"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16.5 21.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM16.5 8.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM13.977 6.872l-5.454 3.506M8.523 13.622l5.454 3.506"
      />
    </svg>
  );
};
export default Share;
