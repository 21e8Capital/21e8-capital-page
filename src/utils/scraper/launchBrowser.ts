import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export const launchBrowser = async () => {
  let executablePath;

  if (true) {
    executablePath = await chromium.executablePath;
  } else {
    executablePath =
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  }

  return puppeteer.launch({
    args: [...require("chrome-aws-lambda").args],
    executablePath,
    headless: true,
  });
};
