import React from 'react';
import { useRef, useEffect } from 'react';

const Panel = ({ width = 700, height = 220, fill = 'rgba(255, 255, 255, 0.7)', panel_style, children }) => {
  const canvasRef = useRef(null);
  const shadowPadding = 20;

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width + shadowPadding * 2, height + shadowPadding * 2);
    ctx.save()

    // Coordinates for polygon shape
    const topOffset = 20;
    const bottomOffset = 20;
    ctx.fillStyle = fill;

    ctx.shadowColor = 'oklch(0.645 0.246 16.439)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;

    ctx.beginPath();
    ctx.moveTo(shadowPadding * 2, shadowPadding + topOffset);                // Top-left
    ctx.lineTo(width * 0.1, shadowPadding);              // Slanted top-left
    ctx.lineTo(width * 0.9 + shadowPadding * 2, shadowPadding);              // Slanted top-right
    ctx.lineTo(width, shadowPadding + topOffset);           // Top-right
    ctx.lineTo(width, height - bottomOffset); // Bottom-right
    ctx.lineTo(width * 0.9 + shadowPadding * 2, height);         // Slanted bottom-right
    ctx.lineTo(width * 0.1, height);         // Slanted bottom-left
    ctx.lineTo(shadowPadding * 2, height - bottomOffset);   // Bottom-left
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'oklch(43.17% 0.244874 289.6159)';
    ctx.lineWidth = 4.0;
    ctx.stroke();
  }, [width, height, fill]);

  return (
    <div
      className={`${panel_style} flex relative z-20 justify-items-center`}
      style={{ display: 'block', width: `${width + shadowPadding * 2}px`, height: `${height + shadowPadding * 2}px`, backgroundColor: 'transparent', }}>
      <canvas
        ref={canvasRef}
        width={width + shadowPadding * 2}
        height={height + shadowPadding * 2}
        style={{ display: 'block' }}
      />
      {children}
    </div>
  );
}

export default Panel
