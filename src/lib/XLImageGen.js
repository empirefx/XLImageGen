export class XLImageGen {
  constructor(width, height, title, chunkSize = 500) {
    this.width = width;
    this.height = height;
    this.title = title;
    this.chunkSize = chunkSize;
    this.canvas = new OffscreenCanvas(width, height);
    this.ctx = this.canvas.getContext("2d");
  }

  drawChunk(x, y, size) {
    const { ctx } = this;
    ctx.fillStyle = "#ffffee";
    ctx.fillRect(x, y, size, size);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, size, size);
  }

  drawTitle(x, y, size) {
    const { ctx, title } = this;
    ctx.fillStyle = "#000";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(title, x + size / 2, y + size / 2);
  }

  drawDashedLines(x, y, size) {
    const { ctx } = this;
    ctx.setLineDash([5, 5]);
    // Horizontal dashed lines
    ctx.beginPath();
    ctx.moveTo(x, y + size / 3);
    ctx.lineTo(x + size, y + size / 3);
    ctx.moveTo(x, y + (2 * size) / 3);
    ctx.lineTo(x + size, y + (2 * size) / 3);
    ctx.stroke();
    // Vertical dashed lines
    ctx.beginPath();
    ctx.moveTo(x + size / 3, y);
    ctx.lineTo(x + size / 3, y + size);
    ctx.moveTo(x + (2 * size) / 3, y);
    ctx.lineTo(x + (2 * size) / 3, y + size);
    ctx.stroke();
  }

  generate() {
    return new Promise((resolve, reject) => {
      try {
        const { ctx, canvas, width, height, chunkSize } = this;
        // Draw global background
        ctx.fillStyle = "#ffffee";
        ctx.fillRect(0, 0, width, height);

        for (let x = 0; x < width; x += chunkSize) {
          for (let y = 0; y < height; y += chunkSize) {
            ctx.save();
            this.drawChunk(x, y, chunkSize);
            this.drawTitle(x, y, chunkSize);
            this.drawDashedLines(x, y, chunkSize);
            ctx.restore();
          }
        }

        canvas.convertToBlob({ type: "image/png" })
          .then(resolve)
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }
}
