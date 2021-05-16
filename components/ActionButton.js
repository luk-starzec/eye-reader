import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { ARROW_DIRECTIONS } from "../helpers/directionsHelper";
import ProgressArrow from "./ProgressArrow";

const StyledWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #eeeeee;

  img {
    opacity: 0.7;
  }

  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;
      &:hover {
        background: #dddddd;

        img {
          opacity: 1;
        }
      }
    `}
`;

const ActionButton = ({ type, progress, action, disabled, className }) => {
  return (
    <StyledWrapper className={className} onClick={action} disabled={disabled}>
      {!disabled && <ProgressArrow type={type} progress={progress} />}
    </StyledWrapper>
  );
};

export default ActionButton;

ActionButton.propTypes = {
  type: PropTypes.oneOf(ARROW_DIRECTIONS).isRequired,
  progress: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
