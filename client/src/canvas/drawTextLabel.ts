export default function drawTextLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font: string,
  align: CanvasTextAlign,
  color: string
) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}
