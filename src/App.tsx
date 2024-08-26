import { useAtom } from "jotai";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { toDosAtom } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vh;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

export default function App() {
  const [toDos, setToDos] = useAtom(toDosAtom);
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
        return { ...allBoards, [source.droppableId]: sourceBoard };
      } else {
        targetBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
      }
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
