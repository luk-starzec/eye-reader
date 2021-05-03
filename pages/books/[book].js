import { getBooks, getBook } from "../../helpers/booksData";
import TableOfContents from "../../components/TableOfContents";

function Book({ book }) {
  return (
    <div>
      {<h3>{book.title}</h3>}
      <TableOfContents chapters={book.chapters} />
    </div>
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

export default Book;
