import React from "react";

type RatingCircleProps = {
  value: number; // 0.0 - 5.0
  max?: number;
  size?: number;
  strokeWidth?: number;
};

export function RatingCircle({
  value,
  max = 5,
  size = 48,
  strokeWidth = 2,
}: RatingCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // процент от max
  const progress = Math.min(value / max, 1);
  const offset = circumference * (1 - progress);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }} // начало сверху
      >
        {/* Серый фон круга */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb" // серый фон (tailwind gray-200)
          fill="none"
          strokeWidth={strokeWidth}
        />
        {/* Прогресс */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2CA893" // твой зелёный
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* Текст по центру */}
      <span
        style={{
          position: "absolute",
          fontSize: size * 0.3,
          fontWeight: "bold",
        }}
      >
        {value.toFixed(1)}
      </span>
    </div>
  );
}
