import Link from "next/link";
import styled from "styled-components";

const StyledWrapper = styled.header`
  display: flex;
`;

const StyledLink = styled.a`
  cursor: pointer;
  padding: 0 0.5em;
  display: flex;
  justify-content: center;
  border: 1px solid #eeeeee;

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
          <img src="/assets/book-icon.svg" />
        </StyledLink>
      </Link>

      <Link href={`/books/${book.path}`}>
        <StyledLink title="Spis treści">
          <img src="/assets/list-icon.svg" />
        </StyledLink>
      </Link>

      <StyledTitle>{book.title}</StyledTitle>

      <div>
          Status:
      </div>
      
    </StyledWrapper>
  );
};

export default ChapterHeader;
