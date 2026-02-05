import React from "react";
import { motion } from "framer-motion";
import { tokens } from "../../styles/tokens";

interface PieChartProps {
  percentages: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

interface PieSlice {
  percentage: number;
  color: string;
  label: string;
  startAngle: number;
  endAngle: number;
}

export const PieChart: React.FC<PieChartProps> = ({ percentages }) => {
  const size = 200;
  const center = size / 2;
  const radius = size / 2 - 10;

  // Configurar os slices
  const slices: PieSlice[] = [];
  let currentAngle = -90; // Começar do topo (12h)

  // Proteína (vermelho)
  const proteinAngle = (percentages.protein / 100) * 360;
  slices.push({
    percentage: percentages.protein,
    color: tokens.colors.red,
    label: "Proteína",
    startAngle: currentAngle,
    endAngle: currentAngle + proteinAngle,
  });
  currentAngle += proteinAngle;

  // Carboidratos (azul)
  const carbsAngle = (percentages.carbs / 100) * 360;
  slices.push({
    percentage: percentages.carbs,
    color: tokens.colors.blue,
    label: "Carboidratos",
    startAngle: currentAngle,
    endAngle: currentAngle + carbsAngle,
  });
  currentAngle += carbsAngle;

  // Lipídios (amarelo)
  const fatsAngle = (percentages.fats / 100) * 360;
  slices.push({
    percentage: percentages.fats,
    color: tokens.colors.yellow,
    label: "Lipídios",
    startAngle: currentAngle,
    endAngle: currentAngle + fatsAngle,
  });

  // Função para criar o path de um slice
  const createSlicePath = (slice: PieSlice): string => {
    const startAngleRad = (slice.startAngle * Math.PI) / 180;
    const endAngleRad = (slice.endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startAngleRad);
    const y1 = center + radius * Math.sin(startAngleRad);
    const x2 = center + radius * Math.cos(endAngleRad);
    const y2 = center + radius * Math.sin(endAngleRad);

    const largeArcFlag = slice.endAngle - slice.startAngle > 180 ? 1 : 0;

    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  // Se não há dados, mostrar círculo cinza
  const hasData = percentages.protein + percentages.carbs + percentages.fats > 0;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg width={size} height={size}>
        {!hasData ? (
          // Círculo vazio quando não há dados
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={tokens.colors.border}
            strokeWidth={2}
          />
        ) : (
          // Renderizar os slices
          slices.map((slice, index) => (
            <motion.path
              key={index}
              d={createSlicePath(slice)}
              fill={slice.color}
              stroke="white"
              strokeWidth={2}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            />
          ))
        )}

        {/* Círculo branco no centro para criar efeito donut (opcional) */}
        <circle
          cx={center}
          cy={center}
          r={radius * 0.6}
          fill="white"
        />

        {/* Texto central */}
        {hasData && (
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              fontSize: 28,
              fontWeight: 800,
              fill: tokens.colors.text,
            }}
          >
            100%
          </text>
        )}
      </svg>
    </div>
  );
};
