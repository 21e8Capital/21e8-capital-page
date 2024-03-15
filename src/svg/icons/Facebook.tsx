import { useTheme } from "next-themes";
import * as React from "react";
import { SVGProps } from "react";

const Facebook = (props: SVGProps<SVGSVGElement>) => {
  const { resolvedTheme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={42}
      height={42}
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill={resolvedTheme === "light" ? "#3F3C3C" : "#fff"}
          d="M42 21c0 10.482-7.68 19.17-17.719 20.745V27.07h4.893l.931-6.07h-5.824v-3.94c0-1.66.814-3.279 3.423-3.279h2.648V8.613s-2.404-.41-4.702-.41c-4.796 0-7.931 2.907-7.931 8.17V21h-5.332v6.07h5.332v14.675C7.679 40.17 0 31.482 0 21 0 9.402 9.402 0 21 0s21 9.402 21 21Z"
        />
        <path
          fill={resolvedTheme === "light" ? "#fff" : "#3F3C3C"}
          d="m29.174 27.07.931-6.07h-5.824v-3.94c0-1.66.814-3.279 3.422-3.279h2.649V8.613s-2.404-.41-4.701-.41c-4.797 0-7.932 2.907-7.932 8.17V21h-5.332v6.07h5.332v14.675a21.15 21.15 0 0 0 6.562 0V27.07h4.893Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill={resolvedTheme === "light" ? "#3F3C3C" : "#fff"}
            d="M0 0h42v42H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Facebook;
