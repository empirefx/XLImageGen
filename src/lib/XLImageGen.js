export class XLImageGen {
  constructor(width, height, chunkSize = 500) {
    this.width = width;
    this.height = height;
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

  drawTitle(x, y, size, index) {
    const { ctx } = this;
    ctx.fillStyle = "#000";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Title (${index})`, x + size / 2, y + size / 2);
  }

  drawDashedLines(x, y, size) {
    const { ctx } = this;
    const fractions = [1/3, 2/3];
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    for (const f of fractions) {
      ctx.moveTo(x, y + f * size);
      ctx.lineTo(x + size, y + f * size);
      ctx.moveTo(x + f * size, y);
      ctx.lineTo(x + f * size, y + size);
    }
    ctx.stroke();
  }

  generate() {
    return new Promise((resolve, reject) => {
      try {
        const { ctx, canvas, width, height, chunkSize } = this;
        // Global background
        ctx.fillStyle = "#ffffee";
        ctx.fillRect(0, 0, width, height);

        let chunkCount = 1;
        for (let x = 0; x < width; x += chunkSize) {
          for (let y = 0; y < height; y += chunkSize) {
            ctx.save();
            this.drawChunk(x, y, chunkSize);
            this.drawTitle(x, y, chunkSize, chunkCount++);
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
