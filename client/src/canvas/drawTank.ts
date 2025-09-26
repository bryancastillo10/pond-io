import { drawWaterWave, drawTextLabel } from "@/canvas";

import type { WaveParams } from "@/canvas/drawWaterWave";
import { labelFont, getTextColor } from "@/canvas/rootStyles";

export default function drawTank(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  tankColor: string,
  label: string,
  waterLevel: number,
  waveColor: string,
  waveDetails: WaveParams<number>,
  isDarkMode: boolean
) {
  // Draw tank outline
  ctx.fillStyle = tankColor;
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = "#060708";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, height);

  // Draw water with animation
  drawWaterWave(ctx, x, y, width, height, waterLevel, waveColor, waveDetails);

  // Draw label
  drawTextLabel(
    ctx,
    label,
    x + width / 2,
    y + height + 20,
    labelFont,
    "center",
    getTextColor(isDarkMode)
  );
}
