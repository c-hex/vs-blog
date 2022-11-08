import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:not(svg, path) {
  color: #fff;
}

*::-webkit-scrollbar {
  height: 4px; /* 스크롤바의 너비 */
}

*::-webkit-scrollbar-thumb {
  height: 10%; /* 스크롤바의 길이 */
  background: ${({ theme }) => theme.color.secondary}; /* 스크롤바의 색상 */

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
