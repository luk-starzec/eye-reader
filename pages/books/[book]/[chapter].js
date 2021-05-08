import { getBooks, getChapter } from "../../../helpers/booksData";
import Link from "next/link";
import styled from "styled-components";
import Chapter from "../../../components/Chapter";
import ProgressArrow, {
  ARROW_UP,
  ARROW_DOWN,
  ARROW_LEFT,
  ARROW_RIGHT,
} from "../../../components/ProgressArrow";
import ActionButton from "../../../components/ActionButton";
import { useEffect, useRef, useState } from "react";
import ChapterHeader from "../../../components/ChapterHeader";
import WebGazer from "../../../components/WebGazer";

const GRID_ROW_HEADER = 5;
const GRID_ROW_BUTTON = 15;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 15vw 70vw 15vw;
  grid-template-rows: ${GRID_ROW_HEADER}vh ${GRID_ROW_BUTTON}vh 65vh ${GRID_ROW_BUTTON}vh;
  grid-template-areas:
    "header header status"
    "top top top"
    "left content right"
    "down down down";
  overflow: hidden;
`;

const StyledHeader = styled(ChapterHeader)`
  grid-area: header;
`;

const StyledTopWrapper = styled(ActionButton)`
  grid-area: top;
  background-color: #eeeeee;
`;

const StyledStatus = styled(WebGazer)`
  grid-area: status;
`;

const StyledDownWrapper = styled(ActionButton)`
  grid-area: down;
  background-color: #eeeeee;
`;

const StyledLeftWrapper = styled.div`
  grid-area: left;
  background-color: #fafafa;
`;

const StyledRightWrapper = styled.div`
  grid-area: right;
  background-color: #fafafa;
`;

const StyledChapter = styled.div`
  grid-area: content;
  overflow: auto;
`;

function ChapterPage({ book, chapter }) {
  const contentRef = useRef(null);
  const [progressUp, setProgressUp] = useState(0);
  const [progressDown, setProgressDown] = useState(0);

  const scrollUp = () => scrollElement(-100);
  const scrollDown = () => scrollElement(100);

  const scrollElement = (value) => {
    contentRef.current.scrollBy({
      top: value,
      behavior: "smooth",
    });
  };

  const onScroll = (element) => {
    if (element.scrollTop <= 0) {
      console.log("top");
    } else if (
      element.scrollTop >=
      element.scrollHeight - element.offsetHeight
    ) {
      console.log("bottom");
    }
  };

  const LOOK_DELAY = 1000;
  let startLookTime = Number.POSITIVE_INFINITY;
  let lookDirection = null;

  const getPoint = (x, y, timestamp) => {
    //if (lookDirection === "STOP") return;

    const vh = window.innerHeight / 100;
    const UP_START = GRID_ROW_HEADER * vh;
    const UP_END = (GRID_ROW_HEADER + GRID_ROW_BUTTON) * vh;
    const DOWN_START = window.innerHeight - GRID_ROW_BUTTON * vh;
    const DOWN_END = window.innerHeight;

    if (y >= UP_START && y <= UP_END) {
      if (lookDirection !== "UP") {
        startLookTime = timestamp;
        console.log("up");
      }
      lookDirection = "UP";
    } else if (y >= DOWN_START && y <= DOWN_END) {
      if (lookDirection !== "DOWN") {
        startLookTime = timestamp;
        console.log("down");
      }
      lookDirection = "DOWN";
    } else {
      startLookTime = Number.POSITIVE_INFINITY;
      lookDirection = null;
    }
    if (lookDirection) {
      const progress = (timestamp - startLookTime) / LOOK_DELAY;
      if (lookDirection === "UP") setProgressUp(progress);
      if (lookDirection === "DOWN") setProgressDown(progress);
    } else {
      setProgressUp(0);
      setProgressDown(0);
    }
    //console.log(progress);

    if (startLookTime + LOOK_DELAY < timestamp) {
      if (lookDirection === "UP") scrollUp();

      if (lookDirection === "DOWN") scrollDown();

      console.log(lookDirection);

      startLookTime = Number.POSITIVE_INFINITY;
      lookDirection = "";
    }
  };

  return (
    <StyledWrapper>
      <StyledHeader book={book} />

      <StyledStatus getPoint={getPoint} />

      <StyledTopWrapper
        type={ARROW_UP}
        progress={progressUp}
        action={scrollUp}
      />

      <StyledDownWrapper
        type={ARROW_DOWN}
        progress={progressDown}
        action={scrollDown}
      />

      <StyledChapter
        ref={contentRef}
        onScroll={() => onScroll(contentRef.current)}
      >
        <Chapter chapter={chapter} />
      </StyledChapter>

      <StyledLeftWrapper>
        {chapter.previous && (
          <Link href={`/books/${book.path}/${chapter.previous}`}>
            <a>
              <ProgressArrow type={ARROW_LEFT} />
            </a>
          </Link>
        )}
      </StyledLeftWrapper>

      <StyledRightWrapper>
        {chapter.next && (
          <Link href={`/books/${book.path}/${chapter.next}`}>
            <a>
              <ProgressArrow type={ARROW_RIGHT} />
            </a>
          </Link>
        )}
      </StyledRightWrapper>
    </StyledWrapper>
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

export default ChapterPage;
