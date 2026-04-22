import React from "react";
// import { useRef, useEffect } from "react";

const Panel = ({
  width = 700,
  height = 220,
  fill = "rgba(255, 255, 255, 0.7)",
  panel_style,
  children,
}) => {
  // const canvasRef = useRef(null);
  const shadowPadding = 20;
  const topOffset = 20;
  const bottomOffset = 20;

  const points = `
    ${shadowPadding * 2},${shadowPadding + topOffset}
    ${width * 0.1},${shadowPadding}
    ${width * 0.9 + shadowPadding * 2},${shadowPadding}
    ${width},${shadowPadding + topOffset}
    ${width},${height - bottomOffset}
    ${width * 0.9 + shadowPadding * 2},${height}
    ${width * 0.1},${height}
    ${shadowPadding * 2},${height - bottomOffset}
  `;

  const totalWidth = width + shadowPadding * 2;
  const totalHeight = height + shadowPadding * 2;
  // useEffect(() => {
  //   const ctx = canvasRef.current.getContext('2d');
  //   ctx.clearRect(0, 0, width + shadowPadding * 2, height + shadowPadding * 2);
  //   ctx.save()

  //   // Coordinates for polygon shape
  //   const topOffset = 20;
  //   const bottomOffset = 20;
  //   ctx.fillStyle = fill;

  //   ctx.shadowColor = 'oklch(0.645 0.246 16.439)';
  //   ctx.shadowBlur = 12;
  //   ctx.shadowOffsetX = 0;
  //   ctx.shadowOffsetY = 2;

  //   ctx.beginPath();
  //   ctx.moveTo(shadowPadding * 2, shadowPadding + topOffset);                // Top-left
  //   ctx.lineTo(width * 0.1, shadowPadding);              // Slanted top-left
  //   ctx.lineTo(width * 0.9 + shadowPadding * 2, shadowPadding);              // Slanted top-right
  //   ctx.lineTo(width, shadowPadding + topOffset);           // Top-right
  //   ctx.lineTo(width, height - bottomOffset); // Bottom-right
  //   ctx.lineTo(width * 0.9 + shadowPadding * 2, height);         // Slanted bottom-right
  //   ctx.lineTo(width * 0.1, height);         // Slanted bottom-left
  //   ctx.lineTo(shadowPadding * 2, height - bottomOffset);   // Bottom-left
  //   ctx.closePath();
  //   ctx.fill();

  //   ctx.strokeStyle = 'oklch(43.17% 0.244874 289.6159)';
  //   ctx.lineWidth = 4.0;
  //   ctx.stroke();
  // }, [width, height, fill]);

  return (
    <div
      className={`${panel_style} flex relative z-20 justify-items-center`}
      style={{ width: `${totalWidth}px`, height: `${totalHeight}px` }}
    >
      {/* <canvas
        ref={canvasRef}
        width={width + shadowPadding * 2}
        height={height + shadowPadding * 2}
        style={{ display: 'block' }}
      /> */}
      <svg
        width={totalWidth}
        height={totalHeight}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="absolute top-0 left-0 -z-10" // Ép khung vẽ nằm chìm xuống dưới children
        style={{
          // Tái tạo lại chính xác hiệu ứng bóng đổ của Canvas
          filter: "drop-shadow(0px 2px 12px oklch(0.645 0.246 16.439))",
        }}
      >
        <polygon
          points={points}
          fill={fill}
          stroke="oklch(43.17% 0.244874 289.6159)"
          strokeWidth="4"
        />
      </svg>
      <div className="z-10 relative w-full h-full">{children}</div>
    </div>
  );
};

export default Panel;
