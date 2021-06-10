import Head from "next/head";
import Link from "next/link";
import { getBooks } from "../helpers/booksData";
import BookPanel from "../components/Home/BookPanel";
import styled from "styled-components";
import HomeButton from "../components/Shared/HomeButton";

const StyledWrapper = styled.div`
  position: relative;
  height: 98vh;
  display: grid;
  grid-template-columns: minmax(6em, 15%) 1fr minmax(6em, 15%);
`;

const StyledBooksWrapper = styled.main`
  grid-column: 2/3;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 5vmin;
  margin-top: 5vmin;
`;

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
`;

const StyledLinkCalibration = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  margin: 0 0.5em 0.5em 0.5em;
  background: #eeeeee;
  color: #333333;
  box-shadow: 0.25em 0.25em 0.25em rgba(0, 0, 0, 0.1);

  img {
    margin: 0 1em;
    filter: grayscale(100%);
  }
`;

export default function HomePage({ books }) {
  return (
    <StyledWrapper>
      <Head>
        <title>eyeReader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <HomeButton />
      </header>

      <StyledBooksWrapper>
        {books.map((book) => (
          <BookPanel
            key={book.path}
            path={book.path}
            title={book.title}
            chapters={book.chapters}
          />
        ))}
      </StyledBooksWrapper>

      <StyledFooter>
        <Link href="/calibrate">
          <StyledLinkCalibration title="Przejdź do kalibracji">
            <img src="/assets/track-dot-icon.svg" />
            Kalibracja
          </StyledLinkCalibration>
        </Link>
      </StyledFooter>
    </StyledWrapper>
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
