import { getBooks, getChapter } from "../../../helpers/booksData";
import Link from "next/link";

function Chapter({ book, chapter }) {
  return (
    <div>
      <h3>{book.title}</h3>
      <h4>{chapter.title}</h4>
      <div>{chapter.content}</div>
      {chapter.previous && (
        <Link href={`/books/${book.path}/${chapter.previous}`}>
          <a>prev</a>
        </Link>
      )}{" "}
      {chapter.next && (
        <Link href={`/books/${book.path}/${chapter.next}`}>
          <a>next</a>
        </Link>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const books = await getBooks();
  const paths = books
    .map((book) =>
      book.chapters.map((chapter) => {
        return {
          params: {
            book: book.path,
            chapter: chapter.path,
          },
        };
      })
    )
    .flat();

  //console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { book: bookPath, chapter: chapterPath } = context.params;

  const data = await getChapter(bookPath, chapterPath);
  //console.log(data);

  return {
    props: data,
  };
}

export default Chapter;
