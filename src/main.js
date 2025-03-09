// Fixed size presets in an array
const fixedSizes = [
  { id: "2k", width: 2000, height: 2000 },
  { id: "4k", width: 4000, height: 4000 },
  { id: "8k", width: 8000, height: 8000 },
  { id: "10k", width: 10000, height: 10000 }
];

// Get DOM elements
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const generateButton = document.getElementById("generate");

// Set fixed values when preset buttons are clicked
fixedSizes.forEach(({ id, width, height }) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", () => {
      widthInput.value = width;
      heightInput.value = height;
    });
  }
});

// Creates a worker and generate the image
const generateImage = () => {
  // Parse values from inputs, fallback to defaults if invalid
  const width = parseInt(widthInput.value, 10) || 2000;
  const height = parseInt(heightInput.value, 10) || 1000;
  const chunkSize = 500; // Using a fixed chunkSize

  const worker = new Worker(new URL("./worker/worker.js", import.meta.url), { type: "module" });
  worker.postMessage({ width, height, chunkSize });

  worker.onmessage = (e) => {
    if (e.data.error) {
      console.error("Worker error:", e.data.error);
      return;
    }
    // Create a download link for the generated image Blob
    const blob = e.data;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "image.png";
    link.click();
  };

  worker.onerror = (error) => console.error("Worker error:", error);
};

// Add event listener to the generate button
generateButton.addEventListener("click", generateImage);
