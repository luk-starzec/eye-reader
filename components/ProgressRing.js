import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledCircle = styled.circle`
  transition: 0.1s stroke-dashoffset;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
`;

const ProgressRing = ({
  radius,
  stroke,
  progress,
  color = "#000000",
  className,
}) => {
  if (!progress) return "";

  const [normalizedRadius, setNormalizedRadius] = useState(0);
  const [circumference, setCircumference] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setNormalizedRadius(getNormalizedRadius(radius, stroke));
    setCircumference(getCircumference(normalizedRadius));
    setOffset(getOfset(circumference, progress));
  });

  return (
    <svg height={radius * 2} width={radius * 2} className={className}>
      <StyledCircle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        strokeDashoffset={offset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

const getNormalizedRadius = (radius, stroke) => radius - stroke / 2;

const getCircumference = (normalizedRadius) => normalizedRadius * 2 * Math.PI;

const getOfset = (circumference, progress) =>
  circumference - progress * circumference;

export default ProgressRing;
