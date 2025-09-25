export interface CarrierParams {
  count: number;
  phase: number;
  speed: number;
  size: number;
}

export default function drawBiofilmCarriers(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  waterLevel: number,
  carrierParams: CarrierParams
) {
  // Only draw carriers in the water area
  const waterHeight = waterLevel;
  const waterY = y + height - waterHeight;

  // Draw cylindrical biofilm carriers (K1/K3 media)
  ctx.fillStyle = "#4A5568"; // Dark gray for plastic media
  ctx.strokeStyle = "#2D3748";
  ctx.lineWidth = 1;

  for (let i = 0; i < carrierParams.count; i++) {
    // Create pseudo-random but consistent positioning based on index
    const seedX = (i * 7 + carrierParams.phase * 0.1) % 100;
    const seedY = (i * 11 + carrierParams.phase * 0.15) % 100;

    const carrierX = x + 10 + (seedX / 100) * (width - 20 - carrierParams.size);
    const carrierY = waterY + 5 + (seedY / 100) * (waterHeight - 10 - carrierParams.size);

    // Draw cylindrical carrier with movement
    const moveX = Math.sin(carrierParams.phase + i * 0.5) * 2;
    const moveY = Math.cos(carrierParams.phase + i * 0.3) * 1;

    const finalX = carrierX + moveX;
    const finalY = carrierY + moveY;

    // Draw cylinder (rectangle with rounded ends)
    ctx.beginPath();
    ctx.roundRect(finalX, finalY, carrierParams.size, carrierParams.size * 0.6, 3);
    ctx.fill();
    ctx.stroke();

    // Draw internal structure lines to show it's a biofilm carrier
    ctx.strokeStyle = "#718096";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(finalX + 2, finalY + 2);
    ctx.lineTo(finalX + carrierParams.size - 2, finalY + carrierParams.size * 0.6 - 2);
    ctx.moveTo(finalX + carrierParams.size - 2, finalY + 2);
    ctx.lineTo(finalX + 2, finalY + carrierParams.size * 0.6 - 2);
    ctx.stroke();

    // Reset stroke style
    ctx.strokeStyle = "#2D3748";
    ctx.lineWidth = 1;
  }
}