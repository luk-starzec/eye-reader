import React from "react";

const TableOfContents = ({ chapters }) => {
  if (chapters == null) return "";

  return (
    <ul>
      {chapters
        .sort((a, b) => a.order - b.order)
        .map((chapter) => (
          <li key={chapter.path}>{chapter.title}</li>
        ))}
    </ul>
  );
};

export default TableOfContents;
