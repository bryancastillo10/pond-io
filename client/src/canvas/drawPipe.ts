import drawTextLabel from "@/canvas/drawTextLabel";
import { pipeLabelFont, textColor } from "@/canvas/rootStyles";

export default function drawPipe(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  label: string = "",
  labelOffset: number = 10,
  pipeLength?: number
) {
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 4;

  const arrowLength = 20;
  const arrowWidth = 12;
  const angle = Math.atan2(endY - startY, endX - startX);

  // If pipeLength provided, override endX/endY
  if (pipeLength !== undefined) {
    endX = startX + Math.cos(angle) * pipeLength;
    endY = startY + Math.sin(angle) * pipeLength;
  }

  const pipeEndX = endX - Math.cos(angle) * arrowLength;
  const pipeEndY = endY - Math.sin(angle) * arrowLength;

  // Draw pipe line
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(pipeEndX, pipeEndY);
  ctx.stroke();

  // Arrowhead
  ctx.save();
  ctx.translate(endX, endY);
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-arrowLength, arrowWidth / 2);
  ctx.lineTo(-arrowLength, -arrowWidth / 2);
  ctx.closePath();
  ctx.fillStyle = "#555";
  ctx.fill();
  ctx.restore();

  if (label) {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    drawTextLabel(
      ctx,
      label,
      midX,
      midY - labelOffset,
      pipeLabelFont,
      "center",
      textColor
    );
  }
}
