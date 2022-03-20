import fs from "fs";
import { dirname } from "path";

export const writeResult = (path: string, content: string) => {
  fs.mkdirSync(dirname(path), { recursive: true });

  if (fs.existsSync(dirname(path))) {
    fs.writeFileSync(path, content);
  }
};
