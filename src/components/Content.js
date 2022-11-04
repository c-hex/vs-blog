import { useContext } from "react";
import AppContext from "../context/AppContext";
import Accordion from "./Accordion";

function Content({ type, title, children }) {
  const { setSelectedPost, openPost, setOpenPost } = useContext(AppContext);

  function selectedFunction() {
    setSelectedPost(title);
    setOpenPost([...openPost, title]);
  }

  return type === "directory" ? (
    <Accordion title={`📂 ${title}`}>
      {children?.map((one, index) => (
        <Content {...one} key={index} />
      ))}
    </Accordion>
  ) : (
    <div onClick={selectedFunction}>&nbsp;&nbsp;&nbsp;&nbsp;📝 {title}</div>
  );
}
export default Content;
