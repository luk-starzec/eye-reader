import { getBooks, getBook } from "../../helpers/booksData";
import Book from "../../components/Book";
import styled from 'styled-components'

const StyledWrapper=styled.div`

`

function BookPage({ book }) {
  return (
    <StyledWrapper>
        <Book book={book}/>
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
