import drawTextLabel from "@/canvas/drawTextLabel";

export default function drawPipe(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  label: string = "",
  labelOffset: number = 10,
  labelFont: string,
  labelColor: string
) {
  ctx.strokeStyle = "#060708";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  if (label) {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    drawTextLabel(
      ctx,
      label,
      midX,
      midY - labelOffset,
      labelFont,
      "center",
      labelColor
    );
  }
}
