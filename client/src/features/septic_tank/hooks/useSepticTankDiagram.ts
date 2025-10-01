import { useRef, useCallback, useEffect } from "react";
import { drawPipe, drawTextLabel, drawWaterWave } from "@/canvas";

import { useAppSelector } from "@/lib/redux/hooks";
import { getTextColor, labelFont } from "@/canvas/rootStyles";

const getTankLineColor = (isDarkMode: boolean) =>
  isDarkMode ? "#f6f7f8" : "#060708";

const useSepticTankDiagram = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const septicTankRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const wavePropsRef = useRef({
    firstTank: { phase: 0, amplitude: 5, frequency: 0.03, speed: 0.05 },
    secondTank: { phase: 0, amplitude: 6, frequency: 0.02, speed: 0.04 },
  });

  const drawDiagram = useCallback(() => {
    const canvas = septicTankRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const lineColor = getTankLineColor(isDarkMode);
    const waterFillColor = isDarkMode
      ? "rgba(50, 150, 200, 0.4)"
      : "rgba(100, 200, 255, 0.4)";

    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 3;

    const TANK_HEIGHT = 200;
    const TOTAL_TANK_WIDTH = 400;
    const TANK_Y_TOP = 80;
    const PADDING_X = (width - TOTAL_TANK_WIDTH) / 2;
    const WATER_LEVEL_Y = TANK_Y_TOP + 50;

    // Compartment dimensions
    const COMP_UNIT_WIDTH = TOTAL_TANK_WIDTH / 3;
    const COMP1_WIDTH = 2 * COMP_UNIT_WIDTH;
    const COMP2_WIDTH = 1 * COMP_UNIT_WIDTH;

    const TANK_X_START = PADDING_X;
    const TANK_X_END = TANK_X_START + TOTAL_TANK_WIDTH;
    const DIVIDER_X = TANK_X_START + COMP1_WIDTH;

    // --- 1. Draw the Outer Tank Structure ---
    ctx.strokeStyle = lineColor;
    ctx.beginPath();

    ctx.moveTo(TANK_X_START, TANK_Y_TOP + TANK_HEIGHT);
    ctx.lineTo(TANK_X_END, TANK_Y_TOP + TANK_HEIGHT);

    ctx.moveTo(TANK_X_START, TANK_Y_TOP);
    ctx.lineTo(TANK_X_START, TANK_Y_TOP + TANK_HEIGHT);

    ctx.moveTo(TANK_X_END, TANK_Y_TOP);
    ctx.lineTo(TANK_X_END, TANK_Y_TOP + TANK_HEIGHT);
    ctx.stroke();

    const BAFFLE_HEIGHT = TANK_HEIGHT * 0.8;
    const BAFFLE_Y_TOP = TANK_Y_TOP + 30;
    const BAFFLE_Y_BOTTOM = BAFFLE_Y_TOP + BAFFLE_HEIGHT;

    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(DIVIDER_X, BAFFLE_Y_TOP);
    ctx.lineTo(DIVIDER_X, BAFFLE_Y_BOTTOM);
    ctx.stroke();

    const waterAreaHeight = TANK_Y_TOP + TANK_HEIGHT - WATER_LEVEL_Y;

    // Compartment 1 Wave
    const wave1Props = wavePropsRef.current.firstTank;
    drawWaterWave(
      ctx,
      TANK_X_START,
      WATER_LEVEL_Y,
      COMP1_WIDTH,
      waterAreaHeight,
      WATER_LEVEL_Y,
      waterFillColor,
      wave1Props
    );

    const wave2Props = wavePropsRef.current.secondTank;
    drawWaterWave(
      ctx,
      DIVIDER_X,
      WATER_LEVEL_Y,
      COMP2_WIDTH,
      waterAreaHeight,
      WATER_LEVEL_Y,
      waterFillColor,
      wave2Props
    );

    // --- 4. Draw Pipes and Labels ---

    const influentPipeY = TANK_Y_TOP + TANK_HEIGHT * 0.4;
    drawPipe(
      ctx,
      PADDING_X - 100,
      influentPipeY,
      TANK_X_START,
      influentPipeY,
      "Influent",
      20,
      isDarkMode,
      100
    );

    const effluentPipeY = TANK_Y_TOP + TANK_HEIGHT * 0.45;
    drawPipe(
      ctx,
      TANK_X_END,
      effluentPipeY,
      TANK_X_END + 80,
      effluentPipeY,
      "Effluent",
      20,
      isDarkMode,
      100
    );

    // --- 5. Draw Compartment Labels ---
    const labelY = TANK_Y_TOP + TANK_HEIGHT + 30;

    drawTextLabel(
      ctx,
      "Primary Tank",
      TANK_X_START + COMP1_WIDTH / 2,
      labelY,
      labelFont,
      "center",
      getTextColor(isDarkMode)
    );

    drawTextLabel(
      ctx,
      "Secondary Tank",
      DIVIDER_X + COMP2_WIDTH / 2,
      labelY,
      labelFont,
      "center",
      getTextColor(isDarkMode)
    );
  }, [isDarkMode]);

  // --- Animation Loop Logic ---
  const animate = useCallback(() => {
    // Update wave phases to create movement
    wavePropsRef.current.firstTank.phase +=
      wavePropsRef.current.firstTank.speed;
    wavePropsRef.current.secondTank.phase +=
      wavePropsRef.current.secondTank.speed;

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
    septicTankRef,
  };
};

export default useSepticTankDiagram;
