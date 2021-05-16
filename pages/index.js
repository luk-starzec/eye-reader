import Head from "next/head";
import { getBooks } from "../helpers/booksData";
import Book from "../components/Book";
import styled from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledList = styled.ul`
  list-style: none;
`;

export default function Home({ books }) {
  return (
    <div>
      <Head>
        <title>eyeReader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <StyledList>
          {books.map((book) => (
            <li key={book.path}>
              <Book
                path={book.path}
                title={book.title}
                chapters={book.chapters}
              />
            </li>
          ))}
        </StyledList>
      </main>
    </div>
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
