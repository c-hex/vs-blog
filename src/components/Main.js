import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineDocument } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import Accordion from "./Accordion";

const tempData = [
  {
    type: "directory",
    title: "일상",
  },
  {
    type: "directory",
    title: "Tech",
    children: [
      {
        type: "post",
        title: "Tech1",
      },
      {
        type: "post",
        title: "Tech2",
      },
      {
        type: "directory",
        title: "Tech3",
        children: [
          {
            type: "post",
            title: "Tech31",
          },
          {
            type: "post",
            title: "Tech32",
          },
        ],
      },
    ],
  },
];

function Main() {
  const [selected, setSelected] = useState(null);

  const listArr = [
    {
      icon: <HiOutlineDocument size={24} />,
      path: "EXPLORER",
      content: (
        <>
          <Accordion title="OPEN POSTS" isBold={true}>
            내요요요옹
          </Accordion>
          <Accordion title="VSCODE" isBold={true}>
            {tempData.map((one) => (
              <Content {...one} />
            ))}
          </Accordion>
        </>
      ),
    },
    {
      icon: <AiOutlineSearch size={24} />,
      path: "SEARCH",
      content: <p>111</p>,
    },
  ];

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

      {selected !== null && listArr[selected] && (
        <LeftContent>
          <p>{listArr[selected].path}</p>
          {listArr[selected].content}
        </LeftContent>
      )}
    </Wrap>
  );
}

function Content({ type, title, children }) {
  return type === "directory" ? (
    <Accordion title={`📂 ${title}`}>
      {children?.map((one) => (
        <Content {...one} />
      ))}
    </Accordion>
  ) : (
    <div>&nbsp;&nbsp;&nbsp;&nbsp;📝 {title}</div>
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
  background-color: #1fb1b1;
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
  padding: 10px;

  > p {
    padding-bottom: 10px;
    color: #7a7a7a;
  }
`;
