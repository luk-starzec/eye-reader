import styled from "styled-components";
import HomeButton from "../components/Shared/HomeButton";
import WebGazer from "../components/Shared/WebGazer";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  header {
    align-self: stretch;
    display: flex;
    justify-content: flex-end;
  }

  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    text-align: center;
  }
`;

const StyledHeader = styled.header``;

function CalibratePage() {
  return (
    <StyledWrapper>
      <header>
        <HomeButton />
        <WebGazer preview={true} />
      </header>

      <h4>
        Kliknij aby rozpocząć
        <br />
        Poruszaj myszą patrząc na kursor na ekranie
      </h4>
    </StyledWrapper>
  );
}

export default CalibratePage;
