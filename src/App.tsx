import { useAtom } from "jotai";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { toDosAtom } from "./atoms";
import Board from "./components/Board";
import { useEffect } from "react";
import Header from "./components/Header";

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
  const [toDos, setToDos] = useAtom(toDosAtom);

  useEffect(() => {
    const toDosInDB = localStorage.getItem("toDos");
    if (toDosInDB) setToDos(JSON.parse(toDosInDB));
    return;
  }, []);

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Header />
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
