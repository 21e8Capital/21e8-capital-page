import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export const launchBrowser = async () => {
  let executablePath;

  if (process.env.VERCEL) {
    executablePath = await chromium.executablePath;
  } else {
    executablePath =
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }

  return puppeteer.launch({
    args: process.env.VERCEL ? [...require("chrome-aws-lambda").args] : [],
    executablePath,
    headless: true,
  });
};
