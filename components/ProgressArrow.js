import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ProgressRing from "./ProgressRing";

const StyledWrapper = styled.div`
  position: relative;
  border: solid 1px #cccccc;
  border-radius: 50%;
  width: 8vmin;
  height: 8vmin;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  transition: background-color 1s;
  ${({ progress }) =>
    progress > 0 &&
    css`
      background: conic-gradient(
        lightgreen ${progress}turn,
        white ${progress}turn
      );
    `}
`;

const StyledRing = styled(ProgressRing)`
  position: absolute;
`;

const StyledArrow = styled.img`
  width: 4vmin;
  height: 4vmin;
  transform: rotate(${({ rotate }) => rotate}deg);
`;

const ProgressArrow = ({ type, progress }) => {
  let rotate = 0;
  switch (type) {
    case ARROW_UP:
      rotate = 0;
      break;
    case ARROW_DOWN:
      rotate = 180;
      break;
    case ARROW_LEFT:
      rotate = 270;
      break;
    case ARROW_RIGHT:
      rotate = 90;
      break;
  }
  const [ringRadius, setRingRadius] = useState(0);
  useEffect(() => setRingRadius(vmin2px(4)), []);

  return (
    <StyledWrapper progress={progress ?? 0}>
      {/* <StyledRing
        radius={ringRadius}
        stroke={6}
        progress={progress}
        color="green"
      /> */}
      <StyledArrow src="/assets/arrow-icon.svg" rotate={rotate} />
    </StyledWrapper>
  );
};

const vmin2px = (value) => {
  const w = window,
    e = document.documentElement,
    b = document.getElementsByTagName("body")[0];

  const x = w.innerWidth || e.clientWidth || b.clientWidth;
  const y = w.innerHeight || e.clientHeight || b.clientHeight;

  return (Math.min(x, y) * value) / 100;
};

export default ProgressArrow;

export const ARROW_UP = "UP";
export const ARROW_DOWN = "DOWN";
export const ARROW_LEFT = "LEFT";
export const ARROW_RIGHT = "RIGHT";
