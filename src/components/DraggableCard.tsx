import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import avatar from "../images/avatar.jpg";
import { BsPencil } from "react-icons/bs";
import { IoCloseOutline, IoTimeOutline } from "react-icons/io5";
import { useSetAtom } from "jotai";
import { toDosAtom } from "../atoms";

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  toDoDate: string;
  index: number;
  boardId: string;
}

interface ICardProps {
  isDragging: boolean;
}

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  top: 0.25rem;
  right: 0.75rem;
  cursor: pointer;

  button {
    margin: 0 0.25rem;
    padding: 0;
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
  }
`;

const Card = styled.div<ICardProps>`
  position: relative;
  margin-bottom: 0.5rem;
  padding: 1.5rem 1rem 1rem 1rem;
  border-radius: 0.5rem;
  box-shadow: ${(props) => "2px 2px 2px rgba(0,0,0,0.2)"};
  color: ${(props) => (props.isDragging ? "white" : props.theme.fontColor)};
  background-color: ${(props) =>
    props.isDragging ? props.theme.fontColor : props.theme.cardColor};
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.1rem;
  line-height: 1.25rem;
  word-break: break-all;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }

  &:not(:hover) {
    ${Buttons} {
      opacity: 0;
    }
  }
`;

const Information = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: 1rem;
  margin-top: 0.875rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    font-weight: 300;
    letter-spacing: normal;
  }

  img {
    width: 1.5rem;
    border-radius: 50%;
  }
`;

function DraggableCard({
  toDoId,
  toDoText,
  toDoDate,
  index,
  boardId,
}: IDraggableCardProps) {
  const setToDos = useSetAtom(toDosAtom);

  const updateCard = () => {
    const inputText = window.prompt()?.trim();

    if (inputText !== undefined) {
      if (inputText === "") {
        alert("Please Fill in the text");
        return;
      }

      setToDos((allToDos) => {
        const targetBoard = [...allToDos[boardId]];
        const targetIndex = targetBoard.findIndex(
          (item) => item.id === toDoId
        )!;
        const newBoard = [...targetBoard];
        newBoard.splice(targetIndex, 1, {
          ...targetBoard[targetIndex],
          text: inputText,
        });

        const newToDos = { ...allToDos, [boardId]: newBoard };
        localStorage.setItem("toDos", JSON.stringify(newToDos));
        return newToDos;
      });
    }
  };

  const deleteCard = () => {
    setToDos((allToDos) => {
      const targetBoard = [...allToDos[boardId]];
      const newBoard = targetBoard.filter((item) => item.id !== toDoId);
      const newToDos = { ...allToDos, [boardId]: newBoard };
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };

  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDoText}
          <Information>
            <div>
              <IoTimeOutline size={18} />
              <span>{toDoDate}</span>
            </div>
            <img src={avatar} alt="avatar" />
          </Information>
          <Buttons>
            <button>
              <BsPencil onClick={updateCard} size={12} color="#4D4D4D" />
            </button>
            <button>
              <IoCloseOutline onClick={deleteCard} size={18} color="#4D4D4D" />
            </button>
          </Buttons>
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DraggableCard);
