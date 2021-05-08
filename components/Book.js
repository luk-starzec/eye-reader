import styled from "styled-components";
import TableOfContents from "./TableOfContents";

const StyledWrapper = styled.div``;
const StyledTitle = styled.h3``;

const Book = ({ book }) => {
  return (
    <StyledWrapper>
      {<StyledTitle>{book.title}</StyledTitle>}
      <TableOfContents chapters={book.chapters} bookPath={book.path} />
    </StyledWrapper>
  );
};

export default Book;
