import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineDocument } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import Accordion from "./Accordion";

const listArr = [
  {
    icon: <HiOutlineDocument size={28} />,
    path: "post",
  },
  {
    icon: <AiOutlineSearch size={28} />,
    path: "search",
  },
];

function Main() {
  const [selected, setSelected] = useState(null);

  return (
    <Wrap>
      <LeftBar>
        {listArr.map((one, index) => (
          <IconWrap
            selected={selected === index}
            onClick={() => {
              setSelected(selected === index ? null : index);
            }}
          >
            {one.icon}
          </IconWrap>
        ))}
      </LeftBar>
      <LeftContent>
        <p>{listArr[selected]?.path}</p>
        {/* // ? --> istArr[selected]가 true일 때만 path를 실행 */}
        <Accordion title="OPEN POSTS">내용내용내용</Accordion>
      </LeftContent>
    </Wrap>
  );
}

export default Main;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;

  border-left: ${({ selected }) => (selected ? 2 : 0)}px solid white;

  > svg {
    color: ${({ selected }) => (selected ? "white" : "#7a7a7a")};
  }
`;

const Wrap = styled.div`
  display: flex;
  height: 100vh;
  background-color: #1e1e1e;
`;

const LeftBar = styled.div`
  width: 50px;
  height: 100%;
  background-color: #333333;
`;

const LeftContent = styled.div`
  width: 250px;
  height: 100%;
  background-color: #252526;

  > p {
    padding: 15px 0 0 10px;
    color: #fff;
  }
`;
