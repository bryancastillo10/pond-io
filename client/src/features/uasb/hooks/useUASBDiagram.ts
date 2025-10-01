import { useRef, useCallback, useEffect } from "react";
import { drawPipe, drawTextLabel, drawWaterWave } from "@/canvas";
import { useAppSelector } from "@/lib/redux/hooks";

import { labelFont } from "@/canvas/rootStyles";

// Define the structure for wave parameters (assuming T is number)
type WaveParams = {
  phase: number;
  amplitude: number;
  frequency: number;
  speed: number;
};

const getTankLineColor = (isDarkMode: boolean): string =>
  isDarkMode ? "#f6f7f8" : "#060708";

const getTextColor = (isDarkMode: boolean): string =>
  isDarkMode ? "#f6f7f8" : "#060708";

const useUASBDiagram = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const uasbRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Define wave properties for the main liquid phase
  const wavePropsRef = useRef<{ mainTank: WaveParams }>({
    mainTank: { phase: 0, amplitude: 4, frequency: 0.04, speed: 0.03 },
  });

  const drawDiagram = useCallback(() => {
    const canvas = uasbRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const lineColor = getTankLineColor(isDarkMode);

    const textColor = getTextColor(isDarkMode);

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 3;

    const TANK_WIDTH = 200;
    const TANK_HEIGHT = 400;
    const TANK_Y_TOP = 50;
    const PADDING_X = (width - TANK_WIDTH) / 2;
    const TANK_X_START = PADDING_X;
    const TANK_X_END = PADDING_X + TANK_WIDTH;
    const TANK_Y_BOTTOM = TANK_Y_TOP + TANK_HEIGHT;

    const SLUDGE_HEIGHT = TANK_HEIGHT * 0.4;
    const TPS_HEIGHT = TANK_HEIGHT * 0.15;
    const SLUDGE_BLANKET_Y = TANK_Y_BOTTOM - SLUDGE_HEIGHT;

    // --- Liquid Level Adjustment ---
    const TANK_HEADSPACE = 120;
    const LIQUID_SURFACE_Y = TANK_Y_TOP + TANK_HEADSPACE;
    // --- End Liquid Level Adjustment ---

    // --- 1. Draw Outer Tank Structure ---
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    // Left Wall
    ctx.moveTo(TANK_X_START, TANK_Y_TOP);
    ctx.lineTo(TANK_X_START, TANK_Y_BOTTOM);
    // Right Wall
    ctx.moveTo(TANK_X_END, TANK_Y_TOP);
    ctx.lineTo(TANK_X_END, TANK_Y_BOTTOM);
    // Bottom
    ctx.moveTo(TANK_X_START, TANK_Y_BOTTOM);
    ctx.lineTo(TANK_X_END, TANK_Y_BOTTOM);
    ctx.stroke();

    // --- 2. Draw Sludge Blanket (Static Fill) ---
    const sludgeFillColor = isDarkMode
      ? "rgba(100, 70, 40, 0.9)"
      : "rgba(150, 100, 60, 0.9)";

    ctx.fillStyle = sludgeFillColor;

    ctx.fillRect(TANK_X_START, SLUDGE_BLANKET_Y, TANK_WIDTH, SLUDGE_HEIGHT);
    // Label Sludge Blanket
    drawTextLabel(
      ctx,
      "Sludge Blanket",
      PADDING_X + TANK_WIDTH / 2,
      SLUDGE_BLANKET_Y + SLUDGE_HEIGHT / 2,
      labelFont,
      "center",
      getTextColor(isDarkMode)
    );

    // --- 3. Draw Water/Liquid Phase (Animated Wave at the top) ---
    // Calculate the total height of the liquid body (from new surface down to sludge blanket)
    const liquidFillHeight = SLUDGE_BLANKET_Y - LIQUID_SURFACE_Y;

    // Draw the animated wave and fill
    const waveProps = wavePropsRef.current.mainTank;
    drawWaterWave(
      ctx,
      TANK_X_START,
      LIQUID_SURFACE_Y,
      TANK_WIDTH,
      liquidFillHeight,
      LIQUID_SURFACE_Y,
      "#0b7ada",
      waveProps
    );

    // --- 4. Draw Three-Phase Separator (TPS) ---
    const TPS_Y_END = TANK_Y_TOP + TPS_HEIGHT;
    const GAS_HOOD_Y = TANK_Y_TOP + 10;
    const GAS_HOOD_WIDTH = TANK_WIDTH * 0.8;
    const GAS_HOOD_X_START = TANK_X_START + (TANK_WIDTH - GAS_HOOD_WIDTH) / 2;

    // Draw the Gas Collector Hoods (inverted V shape)
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.beginPath();

    // Left Hood Baffle (Inner Settler Wall)
    ctx.moveTo(TANK_X_START, GAS_HOOD_Y);
    ctx.lineTo(GAS_HOOD_X_START, TPS_Y_END);

    // Right Hood Baffle (Inner Settler Wall)
    ctx.moveTo(TANK_X_END, GAS_HOOD_Y);
    ctx.lineTo(GAS_HOOD_X_START + GAS_HOOD_WIDTH, TPS_Y_END);

    ctx.stroke();

    // --- 5. Pipes and Labels ---

    const influentPipeY = TANK_Y_BOTTOM - SLUDGE_HEIGHT / 2;

    drawPipe(
      ctx,
      TANK_X_START - 80,
      influentPipeY,
      TANK_X_START,
      influentPipeY,
      "Influent",
      10,
      isDarkMode,
      80
    );

    // Effluent Pipe (Top, after the TPS)
    // New effluent position: below the TPS zone (TPS_Y_END is 110)
    const EFFLUENT_PIPE_Y = TANK_Y_TOP + TPS_HEIGHT + 10; // 50 + 60 + 10 = 120

    drawPipe(
      ctx,
      TANK_X_END,
      EFFLUENT_PIPE_Y, // Adjusted Y
      TANK_X_END + 80,
      EFFLUENT_PIPE_Y, // Adjusted Y
      "Effluent",
      10,
      isDarkMode,
      100
    );

    // Biogas Outlet
    const biogasX = PADDING_X + TANK_WIDTH / 2;
    drawPipe(
      ctx,
      biogasX,
      TANK_Y_TOP,
      biogasX,
      TANK_Y_TOP - 20,
      "Biogas",
      -40,
      isDarkMode,
      40
    );

    // Recycle
    const recycleStartX = TANK_X_END + 80;
    const recycleStartY = 200;

    const turnX1 = recycleStartX;
    const turnY1 = recycleStartY;
    const turnX2 = turnX1;
    const turnY2 = TANK_Y_BOTTOM + 50;
    const recycleEndX = TANK_X_START + 100;
    ctx.strokeStyle = getTankLineColor(isDarkMode);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.setLineDash([8, 4]);

    ctx.strokeStyle = getTankLineColor(isDarkMode);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.setLineDash([8, 4]);

    ctx.moveTo(TANK_X_END, recycleStartY);
    ctx.lineTo(turnX1, turnY1);
    ctx.lineTo(turnX2, turnY2);
    ctx.lineTo(recycleEndX, turnY2);
    ctx.lineTo(recycleEndX, TANK_Y_BOTTOM);

    ctx.stroke();
    ctx.setLineDash([]);

    const ARROW_SIZE = 8;

    ctx.fillStyle = getTankLineColor(isDarkMode);
    ctx.beginPath();
    ctx.moveTo(recycleEndX, TANK_Y_BOTTOM - ARROW_SIZE);
    ctx.lineTo(recycleEndX - ARROW_SIZE, TANK_Y_BOTTOM + ARROW_SIZE);
    ctx.lineTo(recycleEndX + ARROW_SIZE, TANK_Y_BOTTOM + ARROW_SIZE);
    ctx.closePath();
    ctx.fill();

    const labelX = (turnX1 + recycleEndX) / 2;
    drawTextLabel(
      ctx,
      "Recycle",
      labelX,
      turnY2 + 20,
      labelFont,
      "center",
      textColor
    );

    drawTextLabel(
      ctx,
      "Liquid Phase",
      biogasX,
      SLUDGE_BLANKET_Y - 50,
      labelFont,
      "center",
      textColor
    );
  }, [isDarkMode]);

  // --- Animation Loop Logic ---
  const animate = useCallback(() => {
    wavePropsRef.current.mainTank.phase += wavePropsRef.current.mainTank.speed;

    drawDiagram();

    animationFrameId.current = window.requestAnimationFrame(animate);
  }, [drawDiagram]);

  useEffect(() => {
    animationFrameId.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animate]);

  return {
    uasbRef,
  };
};

export default useUASBDiagram;
