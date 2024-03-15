import { useTheme } from "next-themes";
import * as React from "react";
import { SVGProps } from "react";

const XSocial = (props: SVGProps<SVGSVGElement>) => {
  const { resolvedTheme } = useTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          fill={resolvedTheme === "light" ? "#3F3C3C" : "#fff"}
          d="M18.98 13.55 30.635 0h-2.763L17.752 11.765 9.668 0H.344L12.57 17.79.344 32h2.763l10.688-12.424L22.332 32h9.324L18.978 13.55h.001Zm-3.784 4.398-1.239-1.772L4.102 2.08h4.243l7.953 11.377 1.239 1.771 10.338 14.788h-4.243l-8.436-12.067Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill={resolvedTheme === "light" ? "#3F3C3C" : "#fff"}
            d="M0 0h32v32H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default XSocial;
