import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemeWrapper;
