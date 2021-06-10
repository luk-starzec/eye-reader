import styled from "styled-components";
import Link from "next/link";

const StyledHomeLink = styled.a`
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  padding: 0.75em 0.5em 0.25em 0.75em;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.25em 0.25em 0.25em rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const HomeButton = ({ className }) => {
  return (
    <Link href="/">
      <StyledHomeLink title="Strona główna" className={className}>
        <img src="/assets/logo-icon.svg" />
      </StyledHomeLink>
    </Link>
  );
};

export default HomeButton;
