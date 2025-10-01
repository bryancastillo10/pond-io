import { useRef, useCallback, useEffect } from "react";
import { useAppSelector } from "@/lib/redux/hooks";

import { drawPipe, drawTank, drawGasDome } from "@/canvas";

const useADDiagram = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const adRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // State for animated wave properties in each tank
  const wavePropsRef = useRef({
    acidogenesis: { phase: 0, amplitude: 5, frequency: 0.03, speed: 0.05 },
    methanogenesis: { phase: 0, amplitude: 6, frequency: 0.02, speed: 0.04 },
  });

  const drawDiagram = useCallback(() => {
    const canvas = adRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const unitHeight = 250;
    const unitWidth = 190;
    const padding = 100;
    const waterLevel = 200;
    const pipeDiameter = 12;

    // Update wave phases for animation
    wavePropsRef.current.acidogenesis.phase +=
      wavePropsRef.current.acidogenesis.speed;
    wavePropsRef.current.methanogenesis.phase +=
      wavePropsRef.current.methanogenesis.speed;

    const totalDiagramWidth = unitWidth * 2 + padding * 3;
    const centerXOffset = (width - totalDiagramWidth) / 2;
    const tankY = padding;

    // --- 1. Influent Pipe ---
    const influentX = centerXOffset;
    const influentY = tankY + unitHeight / 2;
    drawPipe(
      ctx,
      influentX,
      influentY,
      influentX + padding,
      influentY,
      "Influent",
      pipeDiameter,
      isDarkMode,
      100
    );

    // --- 2. Acid Tank (Acidogenesis) ---
    const acidTankX = influentX + padding;
    const acidTankY = tankY;
    drawTank(
      ctx,
      acidTankX,
      acidTankY,
      unitWidth,
      unitHeight,
      "#F0F8FF",
      "Acid Tank",
      waterLevel,
      "#0b7ada",
      wavePropsRef.current.acidogenesis,
      isDarkMode
    );

    // --- 3. Transfer Pipe (VFAs) ---
    const pipe1StartX = acidTankX + unitWidth;
    const pipe1StartY = acidTankY + unitHeight / 2;
    const pipe1EndX = pipe1StartX + padding;
    const pipe1EndY = pipe1StartY;
    drawPipe(
      ctx,
      pipe1StartX,
      pipe1StartY,
      pipe1EndX,
      pipe1EndY,
      "",
      pipeDiameter,
      isDarkMode
    );

    // --- 4. Methane Tank (Methanogenesis) ---
    const methaneTankX = pipe1EndX;
    const methaneTankY = tankY;
    drawTank(
      ctx,
      methaneTankX,
      methaneTankY,
      unitWidth,
      unitHeight,
      "#F0F8FF",
      "Methane Tank",
      waterLevel,
      "#3CB371",
      wavePropsRef.current.methanogenesis,
      isDarkMode
    );

    // --- 5. Biogas Collection Dome and Output ---
    drawGasDome(ctx, methaneTankX, methaneTankY, unitWidth, isDarkMode);

    // --- 6. Effluent Pipe ---
    const effluentXStart = methaneTankX + unitWidth;
    const effluentY = methaneTankY + unitHeight * 0.9;
    drawPipe(
      ctx,
      effluentXStart,
      effluentY,
      effluentXStart + padding,
      effluentY,
      "Effluent",
      pipeDiameter,
      isDarkMode,
      80
    );

    animationFrameId.current = window.requestAnimationFrame(drawDiagram);
  }, [isDarkMode]);

  useEffect(() => {
    drawDiagram();

    return () => {
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [drawDiagram]);

  return {
    adRef,
  };
};

export default useADDiagram;
