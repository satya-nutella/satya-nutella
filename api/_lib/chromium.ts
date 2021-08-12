import core from "puppeteer-core";
import { getOptions } from "./options";
import { FileType } from "./types";
let _page: core.Page | null;

const getPage = async (isDev: boolean) => {
  if (_page) {
    return _page;
  }

  const options = await getOptions(isDev);
  const browser = await core.launch(options);
  _page = await browser.newPage();
  return _page;
};

export const getScreenshot = async (url: string, type: FileType, isDev: boolean) => {
  const page = await getPage(isDev);
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  await page.goto(url);
  await page.waitForNavigation();
  const file = await page.screenshot({ type });
  return file;
};
