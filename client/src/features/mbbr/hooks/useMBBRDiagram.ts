import { useRef, useCallback, useEffect } from "react";
import { useAppSelector } from "@/lib/redux/hooks";

import {
  drawPipe,
  drawTank,
  drawClarifier,
  drawBiofilmCarriers,
} from "@/canvas";
import { getTextColor, labelFont } from "@/canvas/rootStyles";

const useMBBRDiagram = () => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const mbbrRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  const wavePropsRef = useRef({
    bodRemoval: { phase: 0, amplitude: 5, frequency: 0.03, speed: 0.05 },
    nitrification: { phase: 0, amplitude: 6, frequency: 0.02, speed: 0.04 },
    clarifier: { phase: 0, amplitude: 5, frequency: 0.035, speed: 0.055 },
  });

  const carrierPropsRef = useRef({
    bodRemoval: { count: 18, phase: 0, speed: 0.03, size: 8 },
    nitrification: { count: 22, phase: 0, speed: 0.05, size: 8 },
  });

  const drawDiagram = useCallback(() => {
    const canvas = mbbrRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const unitHeight = 150;
    const unitWidth = 200;
    const padding = 80;
    const waterLevel = 120;
    const clarifierRadius = unitHeight / 2;
    const effluentPipeLength = 100;

    // Update wave phases
    wavePropsRef.current.bodRemoval.phase +=
      wavePropsRef.current.bodRemoval.speed;
    wavePropsRef.current.nitrification.phase +=
      wavePropsRef.current.nitrification.speed;
    wavePropsRef.current.clarifier.phase +=
      wavePropsRef.current.clarifier.speed;

    // Update carrier phases
    carrierPropsRef.current.bodRemoval.phase +=
      carrierPropsRef.current.bodRemoval.speed;
    carrierPropsRef.current.nitrification.phase +=
      carrierPropsRef.current.nitrification.speed;

    const totalDiagramWidth =
      padding +
      unitWidth +
      padding +
      unitWidth +
      padding +
      clarifierRadius * 2 +
      effluentPipeLength;
    const centerXOffset = (width - totalDiagramWidth) / 2;

    // 1. Influent Pipe
    const influentX = centerXOffset;
    const influentY = padding + unitHeight / 2;
    drawPipe(
      ctx,
      influentX,
      influentY,
      padding,
      influentY,
      "Influent",
      10,
      isDarkMode,
      80
    );

    // 2. BOD Removal Tank (First Stage)
    const bodRemovalX = influentX + padding;
    const bodRemovalY = padding;
    drawTank(
      ctx,
      bodRemovalX,
      bodRemovalY,
      unitWidth,
      unitHeight,
      "#F0F8FF",
      "BOD Removal",
      waterLevel,
      "#6e9cc4",
      wavePropsRef.current.bodRemoval,
      isDarkMode
    );

    // Draw biofilm carriers in BOD removal tank
    drawBiofilmCarriers(
      ctx,
      bodRemovalX,
      bodRemovalY,
      unitWidth,
      unitHeight,
      waterLevel,
      carrierPropsRef.current.bodRemoval
    );

    // 3. Pipe between BOD Removal and Nitrification
    const pipe1StartX = bodRemovalX + unitWidth;
    const pipe1StartY = bodRemovalY + unitHeight / 2;
    drawPipe(
      ctx,
      pipe1StartX,
      pipe1StartY,
      pipe1StartX + padding,
      pipe1StartY,
      "",
      10,
      isDarkMode
    );

    // 4. Nitrification Tank (Second Stage)
    const nitrificationX = pipe1StartX + padding;
    const nitrificationY = padding;
    drawTank(
      ctx,
      nitrificationX,
      nitrificationY,
      unitWidth,
      unitHeight,
      "#F0F8FF",
      "Nitrification",
      waterLevel,
      "#98FB98",
      wavePropsRef.current.nitrification,
      isDarkMode
    );

    // Draw biofilm carriers in nitrification tank
    drawBiofilmCarriers(
      ctx,
      nitrificationX,
      nitrificationY,
      unitWidth,
      unitHeight,
      waterLevel,
      carrierPropsRef.current.nitrification
    );

    // 5. Pipe from Nitrification to Clarifier
    const pipe2StartX = nitrificationX + unitWidth;
    const pipe2StartY = nitrificationY + unitHeight / 2;
    const clarifierX = pipe2StartX + padding + clarifierRadius;
    const clarifierY = pipe2StartY;
    drawPipe(
      ctx,
      pipe2StartX,
      pipe2StartY,
      clarifierX - clarifierRadius,
      clarifierY,
      "",
      10,
      isDarkMode,
      115
    );

    // 6. Clarifier
    drawClarifier(
      ctx,
      clarifierX,
      clarifierY,
      clarifierRadius,
      "#F0F8FF",
      "Clarifier",
      waterLevel,
      "#0b7ada",
      wavePropsRef.current.clarifier,
      labelFont,
      getTextColor(isDarkMode)
    );

    // 7. Effluent Pipe
    const effluentX = clarifierX + 40;
    const effluentY = clarifierY;
    drawPipe(
      ctx,
      effluentX,
      effluentY,
      width,
      effluentY,
      "Effluent",
      10,
      isDarkMode,
      100
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
    mbbrRef,
  };
};

export default useMBBRDiagram;
