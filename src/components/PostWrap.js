import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "../context/AppContext";

function PostWrap({ path, title, isClose }) {
  const {
    setSelectedTag,
    selectedPost,
    setSelectedPost,
    openPost,
    setOpenPost,
  } = useContext(AppContext);

  function selectedFunction() {
    setSelectedPost(path);
    setSelectedTag(null);

    if (!openPost.includes(path)) {
      setOpenPost([...openPost, path]);
    }
  }

  return (
    <PostWrapStyled
      onClick={selectedFunction}
      className={selectedPost === path ? "selected" : ""}
    >
      <span
        className={isClose && selectedPost === path ? "visible" : ""}
        onClick={(e) => {
          e.stopPropagation();

          const openPostFilter = openPost.filter((one) => one !== path);
          setOpenPost(openPostFilter);

          setSelectedPost(
            openPostFilter.length !== 0 ? openPostFilter[0] : null
          );
        }}
      >
        &#215;
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📝 {title}
    </PostWrapStyled>
  );
}

export default PostWrap;

const PostWrapStyled = styled.div`
  padding: 5px 0;
  cursor: pointer;
  position: relative;

  &:not(.selected):hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  &.selected {
    background-color: ${({ theme }) => theme.color.selected};
  }

  &:hover > span {
    display: block;
  }

  > span {
    position: absolute;
    left: 6px;
    top: 4.5px;
    display: none;

    &.visible {
      display: block;
    }
  }
`;
