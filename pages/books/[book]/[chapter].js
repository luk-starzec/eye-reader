import { useRouter } from "next/router";
import styled from "styled-components";
import { getBooks, getChapter } from "../../../helpers/booksData";
import {
  getBoundaries,
  getDirection,
  DIRECTION_UP,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_STOP,
} from "../../../helpers/buttonsHelper";
import Chapter from "../../../components/Chapter";
import {
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
const GRID_COLUMN_BUTTON = 15;

const LOOK_DELAY = 500;
let startLookTime = Number.POSITIVE_INFINITY;
let lookDirection = null;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: ${GRID_COLUMN_BUTTON}vw 70vw ${GRID_COLUMN_BUTTON}vw;
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

const StyledStatus = styled(WebGazer)`
  grid-area: status;
  align-self: center;
`;
const StyledTopWrapper = styled(ActionButton)`
  grid-area: top;
`;

const StyledDownWrapper = styled(ActionButton)`
  grid-area: down;
`;

const StyledLeftWrapper = styled(ActionButton)`
  grid-area: left;
`;

const StyledRightWrapper = styled(ActionButton)`
  grid-area: right;
`;

const StyledChapter = styled.div`
  grid-area: content;
  overflow: auto;
`;

function ChapterPage({ book, chapter }) {
  const router = useRouter();
  const contentRef = useRef(null);
  const [progressUp, setProgressUp] = useState(0);
  const [progressDown, setProgressDown] = useState(0);
  const [progressLeft, setProgressLeft] = useState(0);
  const [progressRight, setProgressRight] = useState(0);
  const [disabledUp, setDisabledUp] = useState(true);
  const [disabledDown, setDisabledDown] = useState(true);

  useEffect(() => {
    contentRef.current.scrollTo(0, 0);
    onScroll();
  }, [chapter]);

  const scrollUp = () => scrollContent(-100);
  const scrollDown = () => scrollContent(100);

  const scrollContent = (value) => {
    contentRef.current.scrollBy({
      top: value,
      behavior: "smooth",
    });
  };

  const onScroll = () => {
    const element = contentRef.current;

    const top = element.scrollTop <= 0;
    const bottom =
      element.scrollTop >= element.scrollHeight - element.offsetHeight;

    setDisabledUp(top);
    setDisabledDown(bottom);
  };

  const previousChapter = () =>
    chapter.previous && router.push(`/books/${book.path}/${chapter.previous}`);

  const nextChapter = () =>
    chapter.next && router.push(`/books/${book.path}/${chapter.next}`);

  const getPoint = (x, y, timestamp) => {
    if (lookDirection == DIRECTION_STOP) return;

    const boundaries = getBoundaries(
      GRID_ROW_HEADER,
      GRID_COLUMN_BUTTON,
      GRID_ROW_BUTTON
    );
    const newDirection = getDirection(x, y, boundaries);
    if (lookDirection != newDirection) {
      startLookTime =
        newDirection != null ? timestamp : Number.POSITIVE_INFINITY;
      lookDirection = newDirection;
    }

    setProgress(lookDirection, startLookTime, timestamp);

    if (startLookTime + LOOK_DELAY < timestamp) {
      const direction = lookDirection;
      lookDirection = DIRECTION_STOP;

      lookDirection = execAction(direction);
      startLookTime = Number.POSITIVE_INFINITY;
    }
  };

  const setProgress = (lookDirection, startLookTime, timestamp) => {
    const progress =
      lookDirection != null ? (timestamp - startLookTime) / LOOK_DELAY : 0;

    switch (lookDirection) {
      case DIRECTION_UP:
        setProgressUp(progress);
        setProgressDown(0);
        setProgressLeft(0);
        setProgressRight(0);
        break;
      case DIRECTION_DOWN:
        setProgressDown(progress);
        setProgressUp(0);
        setProgressLeft(0);
        setProgressRight(0);
        break;
      case DIRECTION_LEFT:
        setProgressLeft(progress);
        setProgressUp(0);
        setProgressDown(0);
        setProgressRight(0);
        break;
      case DIRECTION_RIGHT:
        setProgressRight(progress);
        setProgressUp(0);
        setProgressDown(0);
        setProgressLeft(0);
        break;
      default:
        setProgressUp(0);
        setProgressDown(0);
        setProgressLeft(0);
        setProgressRight(0);
        break;
    }
  };

  const execAction = (lookDirection) => {
    switch (lookDirection) {
      case DIRECTION_UP:
        scrollUp();
        return null;
      case DIRECTION_DOWN:
        scrollDown();
        return null;
      case DIRECTION_LEFT:
        previousChapter();
        return DIRECTION_LEFT;
      case DIRECTION_RIGHT:
        nextChapter();
        return DIRECTION_RIGHT;
    }
  };

  return (
    <StyledWrapper>
      <StyledHeader book={book} />

      <StyledStatus getPoint={getPoint} book={book} chapter={chapter} />

      <StyledTopWrapper
        type={ARROW_UP}
        progress={progressUp}
        action={() => execAction(DIRECTION_UP)}
        disabled={disabledUp}
      />

      <StyledDownWrapper
        type={ARROW_DOWN}
        progress={progressDown}
        action={() => execAction(DIRECTION_DOWN)}
        disabled={disabledDown}
      />

      <StyledChapter ref={contentRef} onScroll={onScroll}>
        <Chapter chapter={chapter} />
      </StyledChapter>

      <StyledLeftWrapper
        type={ARROW_LEFT}
        progress={progressLeft}
        action={() => execAction(DIRECTION_LEFT)}
        disabled={chapter.previous == null}
      />

      <StyledRightWrapper
        type={ARROW_RIGHT}
        progress={progressRight}
        action={() => execAction(DIRECTION_RIGHT)}
        disabled={chapter.next == null}
      />
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
