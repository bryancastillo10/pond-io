import { useRef, useEffect, useCallback } from "react";
import {
  drawPipe,
  drawTank,
  drawClarifier,
  drawBiofilmCarriers,
} from "@/canvas";
import { textColor, labelFont, pipeLabelFont } from "@/canvas/rootStyles";

const MbbrSimulation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const unitHeight = 150;
    const unitWidth = 200;
    const padding = 50;
    const waterLevel = 120;

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

    // 1. Influent Pipe
    const influentX = 0;
    const influentY = padding + unitHeight / 2;
    drawPipe(
      ctx,
      influentX,
      influentY,
      padding,
      influentY,
      "Influent",
      10,
      pipeLabelFont,
      textColor
    );

    // 2. BOD Removal Tank (First Stage)
    const bodRemovalX = padding;
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
      "#87CEEB",
      wavePropsRef.current.bodRemoval
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
      pipeLabelFont,
      textColor
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
      wavePropsRef.current.nitrification
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
    const clarifierRadius = unitHeight / 2;
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
      pipeLabelFont,
      textColor
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
      "#87CEEB",
      wavePropsRef.current.clarifier,
      labelFont,
      textColor
    );

    // 7. Effluent Pipe
    const effluentX = clarifierX + clarifierRadius;
    const effluentY = clarifierY;
    drawPipe(
      ctx,
      effluentX,
      effluentY,
      width,
      effluentY,
      "Effluent",
      10,
      pipeLabelFont,
      textColor
    );

    animationFrameId.current = window.requestAnimationFrame(drawDiagram);
  }, []);

  useEffect(() => {
    drawDiagram();
    return () => {
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [drawDiagram]);

  return (
    <section className="w-full h-full flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">
        MBBR (Moving Bed Biofilm Reactor) Process
      </h2>

      <canvas
        ref={canvasRef}
        width={1200}
        height={300}
        className="border border-gray-300 rounded-lg shadow-md"
      />
    </section>
  );
};

export default MbbrSimulation;
