import styled, { css } from "styled-components";
import ProgressArrow from "./ProgressArrow";

const StyledWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #eeeeee;

  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;
      &:hover {
        background: #dddddd;
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
