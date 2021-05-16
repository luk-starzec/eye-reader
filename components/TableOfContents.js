import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledList = styled.ol``;
const StyledItem = styled.li``;

const TableOfContents = ({ chapters, bookPath }) => {
  if (chapters == null) return "";

  return (
    <StyledList>
      {chapters
        .sort((a, b) => a.order - b.order)
        .map((chapter) => (
          <StyledItem key={chapter.path}>
            <Link href={`/books/${bookPath}/${chapter.path}`}>
              <a>{chapter.title}</a>
            </Link>
          </StyledItem>
        ))}
    </StyledList>
  );
};

export default TableOfContents;

TableOfContents.propTypes = {
  bookPath: PropTypes.string.isRequired,
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      order: PropTypes.number,
    })
  ),
};
