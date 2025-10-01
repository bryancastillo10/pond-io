import drawPipe from "@/canvas/drawPipe";
import { getTextColor } from "@/canvas/rootStyles";

const PIPE_H_OFFSET = 200;
const PIPE_V_OFFSET = 70;
const DOME_LINE_WIDTH = 2;

export default function drawGasDome(
  ctx: CanvasRenderingContext2D,
  tankX: number,
  tankY: number,
  tankWidth: number,
  isDarkMode: boolean
) {
  const domeRadius = tankWidth / 2;
  const domeCenter = tankX + domeRadius;

  ctx.beginPath();
  ctx.arc(domeCenter, tankY, domeRadius, Math.PI, 0, false);

  ctx.fillStyle = isDarkMode
    ? "rgba(70, 70, 70, 0.9)"
    : "rgba(180, 180, 180, 0.9)";
  ctx.strokeStyle = getTextColor(isDarkMode);
  ctx.lineWidth = 2;
  ctx.fill();

  ctx.strokeStyle = getTextColor(isDarkMode);
  ctx.lineWidth = DOME_LINE_WIDTH;
  ctx.stroke();

  const pipeStartX = domeCenter;
  const pipeStartY = tankY;

  const pipeEndX = pipeStartX + PIPE_H_OFFSET;
  const pipeEndY = pipeStartY - PIPE_V_OFFSET;

  drawPipe(
    ctx,
    pipeStartX,
    pipeStartY,
    pipeEndX,
    pipeEndY,
    "Biogas",
    35,
    isDarkMode
  );
}
