type WaveParams<T> = {
  phase: T;
  amplitude: T;
  frequency: T;
  speed: T;
};

export default function drawWaterWave(
  ctx: CanvasRenderingContext2D,
  tankX: number,
  tankY: number,
  tankWidth: number,
  tankHeight: number,
  waterLevel: number,
  waveColor: string,
  waveParams: WaveParams<number>
) {
  const { phase, amplitude, frequency } = waveParams;

  const numPoints = 150;

  ctx.save();
  ctx.beginPath();

  // Starting point for the wave
  const startY = tankY + tankHeight - waterLevel + Math.sin(phase) * amplitude;
  ctx.moveTo(tankX, startY);

  // Draw the wave
  for (let i = 0; i < numPoints; i++) {
    const x = tankX + (tankWidth / numPoints) * i;
    const y =
      tankY +
      tankHeight -
      waterLevel +
      Math.sin(i * frequency + phase) * amplitude;
    ctx.lineTo(x, y);
  }

  // Close the path to form a filled shape
  ctx.lineTo(tankX + tankWidth, tankY + tankHeight);
  ctx.lineTo(tankX, tankY + tankHeight);
  ctx.closePath();

  ctx.fillStyle = waveColor;
  ctx.fill();

  ctx.restore();
}
