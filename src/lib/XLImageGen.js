export class XLImageGen {
  constructor(width, height, chunkSize = 500) {
    this.width = width;
    this.height = height;
    this.chunkSize = chunkSize;
    this.canvas = new OffscreenCanvas(width, height);
    this.ctx = this.canvas.getContext("2d");
  }

  // Draws the background and red border for a given chunk
  drawChunk(x, y, size) {
    const { ctx } = this;
    ctx.fillStyle = "#ffffee";
    ctx.fillRect(x, y, size, size); // Draw the chunk's background
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, size, size); // Draw the chunk's border
  }

  // Draws centered title text inside the chunk with a sequential index
  drawTitle(x, y, size, index) {
    const { ctx } = this;
    ctx.fillStyle = "#000";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`Title (${index})`, x + size / 2, y + size / 2);
  }

  // Draws dashed horizontal and vertical lines in the chunk
  drawDashedLines(x, y, size) {
    const { ctx } = this;
    // The fractions array represents the relative positions where the dashed lines will be drawn.
    // 1/3 and 2/3 divide the chunk into three equal parts.
    // The lines are drawn at these fractions of the chunk's width and height.
    const fractions = [1 / 3, 2 / 3];

    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    for (const f of fractions) {
      // Draw horizontal line at y + (f * size)
      ctx.moveTo(x, y + f * size);
      ctx.lineTo(x + size, y + f * size);
      // Draw vertical line at x + (f * size)
      ctx.moveTo(x + f * size, y);
      ctx.lineTo(x + f * size, y + size);
    }
    ctx.stroke();
  }

  // Generates the complete image and returns a promise that resolves with a Blob
  generate() {
    return new Promise((resolve, reject) => {
      try {
        const { ctx, canvas, width, height, chunkSize } = this;
        // Set canvas background
        ctx.fillStyle = "#ffffee";
        ctx.fillRect(0, 0, width, height);

        let chunkCount = 1;
        // Loop over canvas by chunks
        for (let y = 0; y < height; y += chunkSize) {
          for (let x = 0; x < width; x += chunkSize) {
            ctx.save(); // Save current drawing state
            this.drawChunk(x, y, chunkSize);
            this.drawTitle(x, y, chunkSize, chunkCount++);
            this.drawDashedLines(x, y, chunkSize);
            ctx.restore(); // Restore state to avoid style bleed between chunks
          }
        }

        // Convert the canvas to a Blob and resolve the promise
        canvas.convertToBlob({ type: "image/png" })
          .then(resolve)
          .catch(reject);
      } catch (error) {
        reject(error);
      }
    });
  }
}
