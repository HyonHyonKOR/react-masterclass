import { useAtom } from "jotai";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { isLight, toDosAtom } from "./atoms";
import Board from "./components/Board";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { lightTheme, darkTheme } from "./theme";

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
  background-color: ${(props) => props.theme.bgColor};
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  min-height: 80vh;
`;

const Boards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
`;

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [toDos, setToDos] = useAtom(toDosAtom);
  const [isLightMode, setIsLightMode] = useAtom(isLight);

  useEffect(() => {
    const modeInDB = localStorage.getItem("isLightMode");
    if (modeInDB === null) {
      localStorage.setItem("isLightMode", JSON.stringify(true));
    } else {
      setIsLightMode(JSON.parse(modeInDB));
    }

    const toDosInDB = localStorage.getItem("toDos");
    if (toDosInDB) setToDos(JSON.parse(toDosInDB));
    setIsLoading((prev) => !prev);
  }, [setToDos, setIsLightMode]);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (destination?.index === undefined) return;

    setToDos((allBoards) => {
      const sourceBoard = [...allBoards[source.droppableId]];
      const targetBoard = [...allBoards[destination.droppableId]];
      const taskObj = sourceBoard[source.index];
      sourceBoard.splice(source.index, 1);

      if (destination?.droppableId === source.droppableId) {
        sourceBoard.splice(destination?.index, 0, taskObj);
        const newBoard = { ...allBoards, [source.droppableId]: sourceBoard };
        localStorage.setItem("toDos", JSON.stringify(newBoard));
        return newBoard;
      } else {
        targetBoard.splice(destination?.index, 0, taskObj);
        const newBoard = {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
        localStorage.setItem("toDos", JSON.stringify(newBoard));
        return newBoard;
      }
    });
  };

  if (!isLoading) return <p></p>;

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Header />
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId, index) => (
              <Board
                boardId={boardId}
                key={boardId}
                toDos={toDos[boardId]}
                index={index}
              />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </ThemeProvider>
  );
}
