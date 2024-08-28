import { useAtom } from "jotai";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
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
  overflow-x: auto;
  justify-content: center;
  padding: 1rem;
  min-height: 85vh;
`;

const Boards = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: no-wrap;
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

    if (!destination) return;

    if (source.droppableId === "boards") {
      setToDos((allBoards) => {
        const boardsList = Object.keys(allBoards);
        const taskObj = boardsList[source.index];
        boardsList.splice(source.index, 1);
        boardsList.splice(destination.index, 0, taskObj);
        let boards = {};
        boardsList.map((board) => {
          boards = { ...boards, [board]: allBoards[board] };
        });
        localStorage.setItem("toDos", JSON.stringify(boards));
        return { ...boards };
      });
      return;
    }

    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        sourceBoard.splice(destination?.index, 0, taskObj);
        const newBoard = { ...allBoards, [source.droppableId]: sourceBoard };
        localStorage.setItem("toDos", JSON.stringify(newBoard));
        return newBoard;
      });
      return;
    }

    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const targetBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, taskObj);
        const newBoard = {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
        localStorage.setItem("toDos", JSON.stringify(newBoard));
        return newBoard;
      });
      return;
    }
  };

  if (!isLoading) return <p></p>;

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Header />
        <Wrapper>
          <Droppable droppableId="boards" direction="horizontal" type="BOARDS">
            {(provided, snapshot) => (
              <Boards ref={provided.innerRef} {...provided.droppableProps}>
                {Object.keys(toDos).map((boardId, index) => (
                  <Board
                    boardId={boardId}
                    key={boardId}
                    toDos={toDos[boardId]}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </Boards>
            )}
          </Droppable>
        </Wrapper>
      </DragDropContext>
    </ThemeProvider>
  );
}
