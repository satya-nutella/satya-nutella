import { readFileSync } from "fs";
import path from "path";

export const getHtml = () => {
  const templatePath = path.resolve(path.join(__dirname, "..", "..", "web", "index.html"))
  const data = readFileSync(templatePath, { encoding: "utf-8" });
  return data;
};
