import styled from "styled-components";
import WebGazer from "../components/WebGazer";

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

function CalibratePage({ book }) {
  return (
    <StyledWrapper>
      <WebGazer preview={true} />
    </StyledWrapper>
  );
}

export default CalibratePage;
