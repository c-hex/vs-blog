import Accordion from "./Accordion";
import PostWrap from "./PostWrap";

function Content({ type, title, children, path }) {
  return type === "directory" ? (
    <Accordion title={`📂 ${title}`}>
      {children?.map((one, index) => (
        <Content {...one} key={index} />
      ))}
    </Accordion>
  ) : (
    <PostWrap title={title} path={path} />
  );
}
export default Content;

// const PostWrap = styled.div`
//   padding: 5px 0;
//   cursor: pointer;

//   &:not(.selected):hover {
//     background-color: ${({ theme }) => theme.color.hover};
//   }

//   &.selected {
//     background-color: ${({ theme }) => theme.color.selected};
//   }
// `;
