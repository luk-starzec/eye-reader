import { getBooks } from "../../helpers/booksData";
import TableOfContents from "../../components/TableOfContents";

function Books({ books }) {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.path}>
          {book.title}
          <TableOfContents chapters={book.chapters} />
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const books = await getBooks();
  return {
    props: {
      books,
    },
  };
}

export default Books;
