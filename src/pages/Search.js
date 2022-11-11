import React, { useState } from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";

function Search() {
  const [tagData, setTagData] = useState([
    {
      tagTitle: "Tech",
      count: 3,
      postArr: [],
    },
    {
      tagTitle: "일상",
      count: 3,
      postArr: [],
    },
    {
      tagTitle: "일상",
      count: 3,
      postArr: [],
    },
    {
      tagTitle: "일상",
      count: 3,
      postArr: [],
    },
  ]);

  return (
    // initialExpanded={ture} <- true 생략 가능
    <Accordion title="Tags" initialExpanded isBold>
      <TagWrap>
        {tagData.map((one, index) => (
          <Tag key={index}>
            {one.tagTitle} <span>{one.count}</span>
          </Tag>
        ))}
      </TagWrap>
    </Accordion>
  );
}

export default Search;
const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  padding: 5px 10px;
  margin: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.selected};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  > span {
    color: orange;
  }
`;
