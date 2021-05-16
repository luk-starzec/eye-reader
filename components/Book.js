import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";
import TableOfContents from "./TableOfContents";

const StyledWrapper = styled.div``;

const StyledTitle = styled.h3``;

const Book = ({ path, title, chapters }) => {
  return (
    <StyledWrapper>
      <Link href={`/books/${path}`}>
        <a>
          <StyledTitle>{title}</StyledTitle>
        </a>
      </Link>
      <TableOfContents chapters={chapters} bookPath={path} />
    </StyledWrapper>
  );
};

export default Book;

Book.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  chapters: PropTypes.array.isRequired,
};
