import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledWrapper = styled.header`
  display: flex;
  box-shadow: -0.25em 0.25em 0.25em rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled.a`
  cursor: pointer;
  padding: 0 0.5em;
  display: flex;
  justify-content: center;
  border: 1px solid #eeeeee;
  z-index: 1;
  box-shadow: 0em 0.25em 0.25em rgba(0, 0, 0, 0.05);

  img {
    height: 100%;
  }
`;

const StyledTitle = styled.h3`
  align-self: center;
  text-align: center;
  flex-grow: 1;
`;

const ChapterHeader = ({ book, className }) => {
  return (
    <StyledWrapper className={className}>
      <Link href="/">
        <StyledLink title="Strona główna">
          <img src="/assets/logo-icon.svg" />
        </StyledLink>
      </Link>

      <Link href={`/books/${book.path}`}>
        <StyledLink title="Spis treści">
          <img src="/assets/list-icon.svg" />
        </StyledLink>
      </Link>

      <StyledTitle>{book.title}</StyledTitle>
    </StyledWrapper>
  );
};

export default ChapterHeader;

ChapterHeader.propTypes = {
  book: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
};
