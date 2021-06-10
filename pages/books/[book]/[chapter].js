import { useRouter } from "next/router";
import { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { getBooks, getChapter } from "../../../helpers/booksData";
import { getBoundaries } from "../../../helpers/buttonsHelper";
import {
  pointToDirection,
  DIRECTION_UP,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_STOP,
} from "../../../helpers/directionsHelper";
import {
  progressReducer,
  initialProgress,
  getProgress,
} from "../../../helpers/progressHelper";
import Chapter from "../../../components/Chapter/Chapter";
import ActionButton from "../../../components/Chapter/ActionButton";
import ChapterHeader from "../../../components/Chapter/ChapterHeader";
import WebGazer from "../../../components/Shared/WebGazer";

const GRID_ROW_HEADER = 5;
const GRID_ROW_BUTTON = 15;
const GRID_COLUMN_BUTTON = 15;

const SCROLL_VALUE = 100;
const ACTION_DELAY = 500;

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

const StyledWebGazer = styled(WebGazer)`
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

const StyledContent = styled.div`
  grid-area: content;
  overflow: auto;
`;

function ChapterPage({ book, chapter }) {
  const router = useRouter();
  const contentRef = useRef(null);
  const [upDownDisabled, setUpDownDisabled] = useState({});
  const [progress, dispatchProgress] = useReducer(
    progressReducer,
    initialProgress
  );

  useEffect(() => {
    contentRef.current.scrollTo(0, 0);
    checkUpDownAvailability();
  }, [chapter]);

  const checkUpDownAvailability = () => {
    const content = contentRef.current;

    const isTop = content.scrollTop <= 0;
    const isBottom =
      content.scrollTop >= content.scrollHeight - content.offsetHeight - 5;

    setUpDownDisabled({ up: isTop, down: isBottom });
  };

  const scrollContent = (value) =>
    contentRef.current.scrollBy({ top: value, behavior: "smooth" });

  const changeChapter = (bookPath, chapterPath) =>
    router.push(`/books/${bookPath}/${chapterPath}`);

  const lookPoint = (x, y, timestamp) => {
    if (lookDirection == DIRECTION_STOP) return;

    const boundaries = getBoundaries(
      GRID_ROW_HEADER,
      GRID_COLUMN_BUTTON,
      GRID_ROW_BUTTON
    );
    const currentDirection = pointToDirection(x, y, boundaries);

    if (lookDirection != currentDirection) {
      startLookTime =
        currentDirection != null ? timestamp : Number.POSITIVE_INFINITY;
      lookDirection = currentDirection;
    }

    dispatchProgress({
      type: lookDirection,
      payload:
        lookDirection != null
          ? getProgress(startLookTime, timestamp, ACTION_DELAY)
          : 0,
    });

    if (startLookTime + ACTION_DELAY < timestamp) {
      const direction = lookDirection;
      lookDirection = DIRECTION_STOP;

      lookDirection = execAction(direction);
      startLookTime = Number.POSITIVE_INFINITY;
    }
  };

  const execAction = (lookDirection) => {
    switch (lookDirection) {
      case DIRECTION_UP:
        scrollContent(-SCROLL_VALUE);
        return null;
      case DIRECTION_DOWN:
        scrollContent(SCROLL_VALUE);
        return null;
      case DIRECTION_LEFT:
        chapter.previous && changeChapter(book.path, chapter.previous);
        return DIRECTION_LEFT;
      case DIRECTION_RIGHT:
        chapter.next && changeChapter(book.path, chapter.next);
        return DIRECTION_RIGHT;
    }
  };

  return (
    <StyledWrapper>
      <StyledHeader book={book} />

      <StyledWebGazer lookPoint={lookPoint} book={book} chapter={chapter} />

      <StyledTopWrapper
        type={DIRECTION_UP}
        progress={progress.up}
        action={() => execAction(DIRECTION_UP)}
        disabled={upDownDisabled.up}
      />

      <StyledDownWrapper
        type={DIRECTION_DOWN}
        progress={progress.down}
        action={() => execAction(DIRECTION_DOWN)}
        disabled={upDownDisabled.down}
      />

      <StyledContent ref={contentRef} onScroll={checkUpDownAvailability}>
        <Chapter title={chapter.title} content={chapter.content} />
      </StyledContent>

      <StyledLeftWrapper
        type={DIRECTION_LEFT}
        progress={progress.left}
        action={() => execAction(DIRECTION_LEFT)}
        disabled={chapter.previous == null}
      />

      <StyledRightWrapper
        type={DIRECTION_RIGHT}
        progress={progress.right}
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

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { book: bookPath, chapter: chapterPath } = context.params;

  const data = await getChapter(bookPath, chapterPath);

  return {
    props: data,
  };
}

export default ChapterPage;
