import styled from "styled-components";

const StyledWrapper = styled.div`
  padding: max(2em, 10vmin);
`;

const Chapter = ({ chapter }) => {
  return (
    <StyledWrapper>
      <h4>{chapter.title}</h4>
      <div>{chapter.content}</div>
    </StyledWrapper>
  );
};

export default Chapter;
