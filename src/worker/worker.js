import { XLImageGen } from "../lib/XLImageGen.js";

self.onmessage = (e) => {
  const { width, height, title, chunkSize } = e.data;
  const generator = new XLImageGen(width, height, title, chunkSize);
  generator.generate()
    .then(blob => self.postMessage(blob))
    .catch(err => self.postMessage({ error: err.message }));
};
