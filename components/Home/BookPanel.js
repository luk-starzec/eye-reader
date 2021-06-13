import styled from "styled-components";
import PropTypes from "prop-types";
import Link from "next/link";
import TableOfContents from "../Shared/TableOfContents";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-2);
  border: 1px solid var(--surface-2);
  padding: 0;
  width: clamp(20em, 30vmin, 30em);
  height: clamp(20em, 20vmin, 30em);
  box-shadow: 0.25em 0.25em 0.25em var(--shadow-2);
  overflow: hidden;
`;

const StyledTitleLink = styled.a`
  align-self: stretch;
  cursor: pointer;

  h3 {
    padding: 1em;
    margin: 0;
    text-align: center;
    background: var(--surface-2);
  }

  &:hover {
    text-decoration: underline;
  }
`;

const StyledTableOfContents = styled(TableOfContents)`
  height: 100%;
`;

const BookPanel = ({ path, title, chapters, className }) => {
  return (
    <StyledWrapper className={className}>
      <Link href={`/books/${path}`}>
        <StyledTitleLink>
          <h3 title="przejdź do spisu treści">{title}</h3>
        </StyledTitleLink>
      </Link>

      <StyledTableOfContents chapters={chapters} bookPath={path} />
    </StyledWrapper>
  );
};

export default BookPanel;

BookPanel.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  chapters: PropTypes.array.isRequired,
  className: PropTypes.string,
};
