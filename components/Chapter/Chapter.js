import styled from "styled-components";
import PropTypes from "prop-types";

const StyledWrapper = styled.div`
  padding: max(2em, 10vmin);
  padding-top: max(2em, 5vmin);
  color: var(--text-2);
  background-color: var(--surface-1);
`;

const Chapter = ({ title, content }) => {
  return (
    <StyledWrapper>
      <h4>{title}</h4>
      <div>{content}</div>
    </StyledWrapper>
  );
};

export default Chapter;

Chapter.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
};
