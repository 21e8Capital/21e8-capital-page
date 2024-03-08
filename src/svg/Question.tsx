import * as React from "react";
import { SVGProps } from "react";
import { useTheme } from "next-themes";

const Question = (props: SVGProps<SVGSVGElement>) => {
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
        stroke={resolvedTheme === "dark" ? "#FFC403" : "#0d0d0d"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
      />
      <path
        fill={resolvedTheme === "dark" ? "#FFC403" : "#0d0d0d"}
        d="M12 18a1.125 1.125 0 1 0 0-2.25A1.125 1.125 0 0 0 12 18Z"
      />
      <path
        stroke={resolvedTheme === "dark" ? "#FFC403" : "#0d0d0d"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M12 13.5v-.75a2.625 2.625 0 1 0-2.625-2.624"
      />
    </svg>
  );
};
export default Question;
