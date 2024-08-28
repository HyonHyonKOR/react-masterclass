import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { useAtom } from "jotai";
import { themeAtom } from "./atoms";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
*{
  box-sizing:border-box;
}

body {
  font-family: "M PLUS 1p";
  line-height: 1;
  overflow-y: scroll;
  background: ${(props) => props.theme.bgColor};
  background-size:cover;
  background-repeat: no-repeat;
}

a{
  text-decoration: none;
  color: inherit;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
`;

const Root = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLightMode, setIsLightMode] = useAtom(themeAtom);
  const modeInDB = localStorage.getItem("isLightMode");

  useEffect(() => {
    if (modeInDB === null) {
      localStorage.setItem("isLightMode", JSON.stringify(true));
      setIsLightMode({ ...isLightMode, isLight: true });
    } else {
      setIsLightMode(JSON.parse(modeInDB));
    }

    setIsLoading((prev) => !prev);
    return;
  }, [setIsLightMode]);

  const appliedTheme = isLightMode.isLight ? lightTheme : darkTheme;

  if (!isLoading) {
    return <div></div>;
  }

  return (
    <ThemeProvider theme={appliedTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Root />);
