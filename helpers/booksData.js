import { promises as fs } from "fs";
import path from "path";

export async function getBooks() {
  const booksDirectory = path.join(process.cwd(), "books");
  const bookPaths = await fs.readdir(booksDirectory);

  const books = bookPaths.map(async (bookPath) => getBook(bookPath));
  const booksInfo = await Promise.all(books);

  const result = booksInfo.filter((item) => item != null);
  return result;
}

export async function getBook(bookPath) {
  const infoPath = path.join(process.cwd(), "books", bookPath, "_info.json");
  const content = await getFileContent(infoPath);

  if (!content) return null;

  const book = JSON.parse(content);
  return {
    title: book.title,
    path: bookPath,
    chapters: book.chapters,
  };
}

export async function getChapter(bookPath, chapterPath) {
  const book = await getBook(bookPath);
  const chapters = book.chapters.sort((a, b) => a.order - b.order);

  const index = chapters.findIndex((c) => c.path == chapterPath);
  const currentChapter = chapters[index];
  const previousPath = index > 0 ? chapters[index - 1].path : null;
  const nextPath =
    index < chapters.length - 1 ? chapters[index + 1].path : null;

  const contentPath = path.join(
    process.cwd(),
    "books",
    bookPath,
    `${chapterPath}.txt`
  );
  const content = await getFileContent(contentPath);

  return {
    book: {
      title: book.title,
      path: book.path,
    },
    chapter: {
      title: currentChapter.title,
      content: content,
      previous: previousPath,
      next: nextPath,
    },
  };
}

async function getFileContent(path) {
  try {
    return await fs.readFile(path, "utf8");
  } catch (err) {
    return null;
  }
}
