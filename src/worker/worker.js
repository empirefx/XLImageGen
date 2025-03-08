self.onmessage = (e) => {
  const { width, height, title, titleHeight } = e.data;
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  // Title Background
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, width, titleHeight);

  // Title Border
  ctx.strokeStyle = "red";
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, width, titleHeight);

  // Title Text
  ctx.fillStyle = "#000";
  ctx.font = "bold 40px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(title, width / 2, titleHeight / 2);

  // Dashed Guide Lines
  ctx.strokeStyle = "red";
  ctx.setLineDash([5, 5]);

  // Horizontal Lines
  ctx.beginPath();
  ctx.moveTo(0, titleHeight / 3);
  ctx.lineTo(width, titleHeight / 3);
  ctx.moveTo(0, (titleHeight / 3) * 2);
  ctx.lineTo(width, (titleHeight / 3) * 2);
  ctx.stroke();

  // Vertical Lines
  ctx.beginPath();
  ctx.moveTo(width / 3, 0);
  ctx.lineTo(width / 3, titleHeight);
  ctx.moveTo((width / 3) * 2, 0);
  ctx.lineTo((width / 3) * 2, titleHeight);
  ctx.stroke();

  // Convert to Blob & Send Back
  canvas.convertToBlob({ type: "image/png" }).then((blob) => {
    self.postMessage(blob);
  });
};
