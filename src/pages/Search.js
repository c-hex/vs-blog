import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";
import AppContext from "../context/AppContext";

function Search() {
  const { postData, setSelectedTag } = useContext(AppContext);

  const [tagData, setTagData] = useState([]);

  useEffect(() => {
    const tempArr = [];

    searchTagFnc(postData);

    // 태그 데이터 뽑은 함수
    function searchTagFnc(nowPostDataArr) {
      //
      nowPostDataArr.map((nowPostData) => {
        if (nowPostData.type === "post") {
          // 게시물일 경우 처리
          nowPostData.data.tag?.map((tag) => {
            // 임시 데이터에 태그가 존재하는지 검사
            const tempTarget = tempArr.find((temp) => tag === temp.tagTitle);

            if (tempTarget) {
              tempTarget.count += 1;
              tempTarget.postArr.push(nowPostData.path);

              tempTarget.postArr = [...new Set(tempTarget.postArr)];
            } else {
              tempArr.push({
                tagTitle: tag,
                count: 1,
                postArr: [nowPostData.path],
              });
            }
          });
        } else {
          // 디렉토리일 경우 처리
          nowPostData.children && searchTagFnc(nowPostData.children);
        }
      });
    }

    console.log(tempArr);
    setTagData(tempArr);
  }, [postData]);

  return (
    // initialExpanded={ture} <- true 생략 가능
    <Accordion title="Tags" initialExpanded isBold>
      <TagWrap>
        {tagData.map((one, index) => (
          <Tag
            key={index}
            onClick={() => {
              setSelectedTag({
                tagTitle: one.tagTitle,
                path: [],
              });
            }}
          >
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
