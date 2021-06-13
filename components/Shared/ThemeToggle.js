import styled from "styled-components";
import { useState } from "react";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const StyledButton = styled.button`
  position: fixed;
  right: 1em;
  bottom: 1em;
  width: 3em;
  height: 3em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid var(--surface-2);
  background-color: var(--surface-1);
  box-shadow: 0.25em 0.25em 0.25em var(--shadow-1);
  z-index: 10;

  &:hover {
    background: var(--surface-2);
  border: 1px solid var(--surface-3);
  }

  img {
    height: 80%;
  }
`;

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const switchTheme = () => {
    const theme = isDark ? LIGHT_THEME : DARK_THEME;
    setIsDark(!isDark);
    document.documentElement.setAttribute("color-scheme", theme);
  };

  const icon = isDark ? "/assets/light-icon.svg" : "/assets/dark-icon.svg";
  const info = isDark ? "włącz jasny motyw" : "włącz ciemny motyw";

  return (
    <StyledButton onClick={switchTheme}>
      <img src={icon} title={info} />
    </StyledButton>
  );
};

export default ThemeToggle;
