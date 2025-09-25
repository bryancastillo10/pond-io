import { useEffect, useRef } from "react";
import drawWaterWave from "@/canvas/drawWaterWave";

const FullWaterWave = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const waveParams = {
      phase: 0,
      amplitude: 20,
      frequency: 0.05,
      speed: 0.05,
    };

    // The animation loop
    const animate = () => {
      // Clear the canvas for a new frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      waveParams.phase += waveParams.speed;

      // Draw the wave using your utility function
      drawWaterWave(
        ctx,
        0,
        0,
        canvas.width,
        canvas.height,
        120,
        "#2593f4",
        waveParams
      );
      requestAnimationFrame(animate);
    };

    animate();

    return () => {};
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-screen h-1/4 -z-0"
    />
  );
};

export default FullWaterWave;
