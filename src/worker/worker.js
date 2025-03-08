self.onmessage = (e) => {
  const { width, height, title } = e.data;
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Global background
  ctx.fillStyle = "#ffffee";
  ctx.fillRect(0, 0, width, height);

  const chunkSize = 500;
  for (let x = 0; x < width; x += chunkSize) {
    for (let y = 0; y < height; y += chunkSize) {
      ctx.save();

      // Chunk background & border
      ctx.fillStyle = "#ffffee";
      ctx.fillRect(x, y, chunkSize, chunkSize);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, chunkSize, chunkSize);

      // Title Text
      ctx.fillStyle = "#000";
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(title, x + chunkSize / 2, y + chunkSize / 2);

      // Reset fillStyle if needed (preventing color bleed)
      ctx.fillStyle = "#ffffee";

      // Dashed guide lines
      ctx.strokeStyle = "red";
      ctx.setLineDash([5, 5]);

      // Horizontal dashed lines
      ctx.beginPath();
      ctx.moveTo(x, y + chunkSize / 3);
      ctx.lineTo(x + chunkSize, y + chunkSize / 3);
      ctx.moveTo(x, y + (chunkSize / 3) * 2);
      ctx.lineTo(x + chunkSize, y + (chunkSize / 3) * 2);
      ctx.stroke();

      // Vertical dashed lines
      ctx.beginPath();
      ctx.moveTo(x + chunkSize / 3, y);
      ctx.lineTo(x + chunkSize / 3, y + chunkSize);
      ctx.moveTo(x + (chunkSize / 3) * 2, y);
      ctx.lineTo(x + (chunkSize / 3) * 2, y + chunkSize);
      ctx.stroke();

      ctx.restore();
    }
  }

  canvas.convertToBlob({ type: "image/png" }).then((blob) => {
    self.postMessage(blob);
  });
};
