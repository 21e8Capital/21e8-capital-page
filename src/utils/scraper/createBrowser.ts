import chromium from "@sparticuz/chromium";
import puppeteer, { Browser } from "puppeteer-core";

export const createBrowser = async () => {
  let browser: Browser | undefined | null;

  if (process.env.NODE_ENV !== "development") {
    chromium.setGraphicsMode = false;
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  } else {
    browser = await puppeteer.launch({
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true,
    });
  }

  return browser;
};
