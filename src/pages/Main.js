import React, { useContext, useState } from "react";
import styled from "styled-components";
import { VscFiles } from "react-icons/vsc";
import { VscSearch } from "react-icons/vsc";
import { VscClose } from "react-icons/vsc";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

import Accordion from "../components/Accordion";
import Content from "../components/Content";
import AppContext from "../context/AppContext";
import { getPostOne } from "../common/common.function";
import PostWrap from "../components/PostWrap";
import remarkGfm from "remark-gfm";
import Search from "./Search";

function Main() {
  const [selected, setSelected] = useState(null);
  const {
    theme,
    setTheme,
    setOpenPost,
    setSelectedPost,
    selectedPost,
    postData,
    openPost,
    selectedTag,
    setSelectedTag,
  } = useContext(AppContext);
  const listArr = [
    {
      icon: <VscFiles size={24} />,
      path: "EXPLORER",
      content: (
        <>
          <Accordion title="OPEN POSTS" isBold={true} initialExpanded={true}>
            {openPost.map((one, index) => {
              const data = getPostOne(postData, one);

              return (
                <PostWrap
                  path={data.path}
                  title={data.title}
                  isClose={true}
                  key={index}
                />
              );
            })}
          </Accordion>
          <Accordion title="VSCODE" isBold={true} initialExpanded={true}>
            {postData.map((one, index) => (
              <Content {...one} key={index} />
            ))}
          </Accordion>
        </>
      ),
    },
    {
      icon: <VscSearch size={24} />,
      path: "SEARCH",
      content: <Search />,
    },
  ];

  const data = getPostOne(postData, selectedPost);
  return (
    <Wrap>
      <LeftBar>
        <div>
          {listArr.map((one, index) => (
            <IconWrap
              selected={selected === index}
              onClick={() => {
                setSelected(selected === index ? null : index);
              }}
              key={index}
            >
              {one.icon}
            </IconWrap>
          ))}
        </div>

        <div>
          <div
            className={theme}
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          ></div>
        </div>
      </LeftBar>

      {selected !== null && listArr[selected] && (
        <LeftContent>
          <p>{listArr[selected].path}</p>
          {listArr[selected].content}
        </LeftContent>
      )}

      <RightWrap selected={selected}>
        {selectedTag ? (
          <RightTagContent>
            <div>
              <h2>
                {selectedTag.tagTitle} 관련 글 목록
                <span>({selectedTag.path.length}개)</span>
              </h2>
              <div>
                {selectedTag.path.map((path, index) => {
                  const tagData = getPostOne(postData, path);
                  return (
                    <div
                      key={index}
                      className="post"
                      onClick={() => {
                        setSelectedPost(tagData.path);
                        setSelectedTag(null);

                        if (!openPost.includes(path)) {
                          setOpenPost([...openPost, path]);
                        }
                      }}
                    >
                      <div>
                        <div>
                          {tagData.data.thumnail && (
                            <img src={tagData.data.thumnail} alt="" />
                          )}
                        </div>
                        <h3>{tagData.title}</h3>
                      </div>
                      <div>
                        {tagData.data.tag.map((one) => (
                          <span key={index}>{one}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </RightTagContent>
        ) : (
          <>
            <RightHeader visible={openPost.length !== 0 ? true : false}>
              {openPost.map((one, index) => {
                const data = getPostOne(postData, one);

                return (
                  <div
                    className={selectedPost === one ? "selected" : ""}
                    onClick={() => {
                      setSelectedPost(data.path);
                    }}
                    key={index}
                  >
                    📝 {data.title}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        const openPostFilter = openPost.filter(
                          (one) => one !== data.path
                        );
                        setOpenPost(openPostFilter);

                        setSelectedPost(
                          openPostFilter.length !== 0 ? openPostFilter[0] : null
                        );
                      }}
                    >
                      <VscClose size={16.5} />
                    </span>
                  </div>
                );
              })}
            </RightHeader>

            <RightContent
              selected={selected}
              visible={openPost.length !== 0 ? true : false}
            >
              {data && (
                <>
                  <p>{data.path}</p>
                  <div>
                    <h1>{data.title}</h1>
                    <p>
                      <strong>ChaeYeon Ryu</strong> | {data?.data?.date}
                    </p>
                    <div>
                      {data.data?.tag?.map((one, index) => (
                        <span key={index}>{one}</span>
                      ))}
                    </div>
                    <div className="markdown">
                      <ReactMarkdown
                        children={data.data?.content}
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) {
                            const match = /language-(\w+)/.exec(
                              className || ""
                            );
                            return !inline && match ? (
                              <SyntaxHighlighter
                                children={String(children).replace(/\n$/, "")}
                                style={nightOwl}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                              />
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            </RightContent>
          </>
        )}
      </RightWrap>
    </Wrap>
  );
}

export default Main;

const RightWrap = styled.div`
  width: ${({ selected }) =>
    selected === null ? "calc(100% - 40px)" : "calc(100% - 250px - 50px)"};

  @media (max-width: 540px) {
    display: ${({ selected }) => (selected === null ? "block" : "none")};
  }
`;

const RightHeader = styled.div`
  width: 100%;
  height: 45px;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.color.secondary};

  ::-webkit-scrollbar-thumb {
    display: none;
  }

  &:hover::-webkit-scrollbar-thumb {
    display: block;
  }

  > div {
    width: 150px;
    padding: 10px;
    background-color: ${({ theme }) => theme.color.secondary};
    min-width: 150px;
    position: relative;
    cursor: pointer;

    &.selected {
      background-color: ${({ theme }) => theme.color.primary};
      color: ${({ theme }) => theme.color.postText};
    }

    &:not(.selected) > span {
      display: none;
    }

    &:hover > span {
      display: block;
    }

    > span {
      position: absolute;
      right: 15px;
      top: 10px;
    }
  }
`;

const RightTagContent = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  width: 100%;
  height: ${({ visible }) => (visible ? "calc(100% - 50px)" : "100%")};
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;

  > div {
    width: 100%;
    max-width: 700px;
    > h2 {
      border-bottom: 2px solid ${({ theme }) => theme.color.selected};
      padding: 30px 0 10px 0;
      color: ${({ theme }) => theme.color.postText};
      > span {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.color.postDate};
      }
    }
    > div {
      > div.post {
        padding: 10px;
        margin-top: 20px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.color.third};
        cursor: pointer;

        &:hover {
          background-color: ${({ theme }) => theme.color.secondary};
          transform: scale(1.01);
          transition: 0.2s;
        }
        > div:first-child {
          display: flex;
          > div {
            width: 50px;
            height: 50px;
            /* background-color: ${({ theme }) => theme.color.selected}; */
            background-color: orange;
            border-radius: 5px;

            overflow: hidden;

            > img {
              width: 100%;
              height: 100%;

              object-fit: cover;
            }
          }
          > h3 {
            padding-left: 10px;
          }
        }
        > div:last-child {
          padding-top: 5px;
          > span {
            display: inline-block;
            padding: 3.5px 10px;
            border-radius: 7px;
            margin-right: 10px;
            color: ${({ theme }) => theme.color.text};
            background-color: ${({ theme }) => theme.color.selected};
          }
          span:hover {
            text-decoration: underline;
            cursor: pointer;
            color: ${({ theme }) => theme.color.third};
          }
        }
      }
    }
  }
`;

const RightContent = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  width: 100%;
  height: ${({ visible }) => (visible ? "calc(100% - 45px)" : "100%")};
  padding: 10px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;

  strong {
    color: ${({ theme }) => theme.color.postDate};
  }

  > p {
    width: 100%;
    color: ${({ theme }) => theme.color.postDate};
  }
  > div {
    width: 100%;
    max-width: 600px;
    > h1 {
      color: ${({ theme }) => theme.color.postText};
      padding: 10px 0 20px 0;
    }

    > p {
      padding-bottom: 10px;
      color: ${({ theme }) => theme.color.postDate};
      padding-bottom: 30px;
      border-bottom: 2px solid ${({ theme }) => theme.color.selected};
    }
    > div:nth-child(3) {
      padding: 30px 0 20px 0;
      > span {
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.color.secondary};
      }
    }
    > div:last-child.markdown {
      h1 {
        color: orange;
        padding: 10px 0 30px 0;
      }
      p {
        color: ${({ theme }) => theme.color.postText};
      }
      h2,
      h3,
      h4,
      h5 {
        padding: 15px 0;
        color: ${({ theme }) => theme.color.postText};
      }

      strong {
        color: ${({ theme }) => theme.color.postText};
      }
    }
  }
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;

  border-left: ${({ theme, selected }) =>
    `${selected ? 2 : 0}px solid ${theme.color.text}`};
  > svg {
    color: ${({ theme, selected }) =>
      selected ? theme.color.text : "#7a7a7a"};
  }
`;

const Wrap = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftBar = styled.div`
  padding-top: 7px;
  width: 50px;
  min-width: 50px; // flex 때문에 LeftBar가 줄어드는 현상을 방지
  height: 100%;
  background-color: ${({ theme }) => theme.color.third};

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  > div:last-child {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;

    > div {
      height: 45px;
      width: 25px;
      /* border: 1px solid ${({ theme }) => theme.color.text}; */
      background-color: ${({ theme }) => theme.color.secondary};
      border-radius: 50px;
      position: relative;
      cursor: pointer;

      &::after {
        content: "";
        position: absolute;
        top: 4px;
        left: 3px;

        width: 19px;
        height: 19px;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.color.selected};
        transition: 0.3s;
      }
      &.light::after {
        top: 22px;
      }
    }
  }
`;

const LeftContent = styled.div`
  width: 250px;
  min-width: 250px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 10px;

  > p {
    padding-bottom: 10px;
    color: #7a7a7a;
  }

  @media (max-width: 540px) {
    width: 100%;
  }
`;
