import { IncomingMessage, ServerResponse } from "http";
import { getScreenshot } from "./_lib/chromium";

const isDev = !process.env.AWS_REGION;
const baseUrl =  process.env.DEPLOYMENT_URL || "http://localhost:3000";
const isHtmlDebug = process.env.HTML_DEBUG === "1";

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const fileType = "png";

    if (isHtmlDebug) {
      res.setHeader("Content-Type", "text/html");
      res.end(`<h1>In debug mode</h1>`);
      return;
    }

    const file = await getScreenshot(baseUrl, fileType, isDev);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
    res.setHeader('Cache-Control', `public, no-transform, s-maxage=2592000, max-age=2592000`);
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};

export default handler;
