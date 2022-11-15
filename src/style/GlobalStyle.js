import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* transition: .3s; */
}

*:not(svg, path) {
  color: ${({ theme }) => theme.color.text};
}

*::-webkit-scrollbar {
  height: 4px; /* 스크롤바의 너비 */
}

*::-webkit-scrollbar-thumb {
  height: 20%; /* 스크롤바의 길이 */
  width: 3px;
  background: ${({ theme }) => theme.color.third}; /* 스크롤바의 색상 */

  border-radius: 10px;
}

*::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.color.primary};
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

`;
