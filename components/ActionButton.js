import styled from "styled-components";
import ProgressArrow from "./ProgressArrow";

const StyledWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;

  &:hover {
    background: #dddddd;
  }
`;

const ActionButton = ({ type, progress, action, className }) => {
  return (
    <StyledWrapper className={className} onClick={action}>
      <ProgressArrow type={type} progress={progress} />
    </StyledWrapper>
  );
};

export default ActionButton;
