import { getBooks, getBook } from "../../helpers/booksData";
import BookPanel from "../../components/Home/BookPanel";
import styled from "styled-components";
import HomeButton from "../../components/Shared/HomeButton";
import TableOfContents from "../../components/Shared/TableOfContents";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.h3``;

const StyledTableOfContents = styled(TableOfContents)`
  max-height: 85vh;
  margin: 0 6em;
  padding: 2em 3em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: center;
  border: 1px solid var(--surface-2);
  box-shadow: 0.25em 0.25em 0.25em var(--shadow-2);
  overflow: auto;

  li {
    min-width: 10em;
    margin: 0.5em 2em 0.5em 3em;
  }
`;

function BookPage({ book }) {
  const { path, title, chapters } = book;

  return (
    <StyledWrapper>
      <header>
        <HomeButton />
        <StyledTitle>{title}</StyledTitle>
      </header>

      <main>
        <StyledTableOfContents
          chapters={chapters}
          bookPath={path}
          fullView={true}
        />
      </main>
    </StyledWrapper>
  );
}

export async function getStaticPaths() {
  const books = await getBooks();
  const paths = books.map(({ path }) => {
    return {
      params: {
        book: path,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { book: bookPath } = context.params;
  const book = await getBook(bookPath);
  return {
    props: {
      book,
    },
  };
}

export default BookPage;
