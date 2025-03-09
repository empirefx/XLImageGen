const worker = new Worker(new URL("./worker/worker.js", import.meta.url), { type: "module" });

worker.postMessage({
  width: 2000,
  height: 1000,
  title: "My Large Image",
  chunkSize: 500
});

worker.onmessage = (e) => {
  if (e.data.error) {
    console.error("Worker error:", e.data.error);
    return;
  }
  const blob = e.data;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "image.png";
  link.click();
};

worker.onerror = (error) => console.error("Worker error:", error);

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
});
