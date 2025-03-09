import { XLImageGen } from "../lib/XLImageGen.js";

self.onmessage = (e) => {
  const { width, height, chunkSize } = e.data;
  const generator = new XLImageGen(width, height, chunkSize);
  generator.generate()
    .then(blob => self.postMessage(blob))
    .catch(err => self.postMessage({ error: err.message }));
};
