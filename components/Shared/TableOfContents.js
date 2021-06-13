import Link from "next/link";
import PropTypes from "prop-types";
import styled from "styled-components";

const MAX_ITEMS = 5;

const StyledList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 2em;
  padding: 0;
`;

const StyledItem = styled.li`
  margin-left: -1em;

  a,
  span {
    position: relative;
    left: 1em;
    display: block;
    transition: transform 0.1s ease;

    &:hover {
      text-decoration: underline;
      transform: scale(1.1);
    }
  }
`;

const StyledMaskedItem = styled(StyledItem)`
  opacity: 0.3;
  pointer-events: none;
`;

const TableOfContents = ({ chapters, bookPath, fullView, className }) => {
  if (chapters == null) return "";

  const sortedChapters = chapters.sort((a, b) => a.order - b.order);
  const items = fullView ? sortedChapters : sortedChapters.slice(0, MAX_ITEMS);
  const isMore = fullView ? false : chapters.length > MAX_ITEMS;

  return (
    <>
      <StyledList className={className}>
        {items.map((chapter) => (
          <StyledItem key={chapter.path}>
            <Link href={`/books/${bookPath}/${chapter.path}`}>
              <a title={`przejdź do rozdziału ${chapter.title}`}>
                {chapter.title}
              </a>
            </Link>
          </StyledItem>
        ))}
        {isMore && (
          <StyledMaskedItem>
            <span>{sortedChapters[MAX_ITEMS].title}</span>
          </StyledMaskedItem>
        )}
      </StyledList>
    </>
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
  className: PropTypes.string,
};
