import styled from "styled-components";
import HomeButton from "../components/Shared/HomeButton";
import WebGazer from "../components/Shared/WebGazer";

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-end;
`;


function CalibratePage() {
  return (
    <StyledHeader>
      <HomeButton />
      <WebGazer preview={true} />
    </StyledHeader>
  );
}

export default CalibratePage;
