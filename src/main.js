const worker = new Worker(new URL("./worker/worker.js", import.meta.url));

worker.postMessage({
  width: 2000,
  height: 1000,
  title: "My Large Image",
  titleHeight: 100
});

worker.onmessage = (e) => {
  const blob = e.data;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "image.png";
  link.click();
};

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
});