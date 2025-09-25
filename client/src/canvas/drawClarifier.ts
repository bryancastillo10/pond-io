import { drawWaterWave, drawTextLabel } from "@/canvas";
import type { WaveParams } from "@/canvas/drawWaterWave";

export default function drawClarifier(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  clarifierColor: string,
  label: string,
  waterLevel: number,
  waveColor: string,
  waveDetails: WaveParams<number>,
  labelFont: string,
  labelColor: string
) {
  ctx.save();
  ctx.beginPath();
  // Draw the clarifier shape as an inverted triangle
  const topY = y - radius;
  const bottomY = y + radius;
  ctx.moveTo(x - radius, topY);
  ctx.lineTo(x + radius, topY);
  ctx.lineTo(x, bottomY);
  ctx.closePath();

  ctx.fillStyle = clarifierColor;
  ctx.fill();
  ctx.strokeStyle = "#060708";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw water wave inside the clarifier (clipped to the triangle)
  ctx.clip(); // Clip the drawing to the clarifier's path
  drawWaterWave(
    ctx,
    x - radius,
    y - radius,
    radius * 2,
    radius * 2,
    waterLevel,
    waveColor,
    waveDetails
  );

  ctx.restore();

  // Draw the label
  drawTextLabel(
    ctx,
    label,
    x,
    y + radius + 20,
    labelFont,
    "center",
    labelColor
  );
}
