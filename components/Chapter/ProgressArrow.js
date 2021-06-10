import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import {
  DIRECTION_UP,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  ARROW_DIRECTIONS,
} from "../../helpers/directionsHelper";

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

  ${({ progress }) =>
    progress > 0 &&
    css`
      background: conic-gradient(
        lightgreen ${progress}turn,
        white ${progress}turn
      );
    `}
`;

const StyledArrow = styled.img`
  width: 4vmin;
  height: 4vmin;
  transform: rotate(${({ rotate }) => rotate}deg);
`;

const ProgressArrow = ({ type, progress, className }) => {
  const [rotate, setRotate] = useState(0);
  useEffect(() => setRotate(getRotation(type)), [type]);

  return (
    <StyledWrapper progress={progress ?? 0}>
      <StyledArrow src="/assets/arrow-icon.svg" rotate={rotate} />
    </StyledWrapper>
  );
};

const getRotation = (type) => {
  switch (type) {
    case DIRECTION_UP:
      return 0;
    case DIRECTION_DOWN:
      return 180;
    case DIRECTION_LEFT:
      return 270;
    case DIRECTION_RIGHT:
      return 90;
  }
};

export default ProgressArrow;

ProgressArrow.propTypes = {
  type: PropTypes.oneOf(ARROW_DIRECTIONS).isRequired,
  progress: PropTypes.number.isRequired,
  className: PropTypes.string,
};
