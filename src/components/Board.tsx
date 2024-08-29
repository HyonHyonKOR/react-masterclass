import { useForm } from "react-hook-form";
import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { ITodo, toDosAtom } from "../atoms";
import { useSetAtom } from "jotai";
import { IoIosAdd } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { Months } from "../types/Months";
import { memo } from "react";

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IForm {
  toDo: string;
}

const BoardHeader = styled.header`
  display: flex;
  padding: 0.5rem 0;
  justify-content: flex-end;
  button {
    cursor: pointer;
    padding: 0;
    background-color: transparent;
    color: ${(props) => props.theme.fontMainColor};
    border: none;
    outline: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 18rem;
  max-width: 18rem;
  padding: 0.5rem;
  background: ${(props) => props.theme.boardColor};
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  border: solid 1px ${(props) => props.theme.borderColor};
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05);

  &:not(:hover) {
    ${BoardHeader} {
      opacity: 0;
    }
  }
`;

const Title = styled.h2`
  margin-top: 0.5rem;
  padding: 0.75rem;
  color: ${(props) => props.theme.fontMainColor};
  font-family: "M PLUS 1p";
  font-size: 1.25rem;
  font-weight: 600;
  word-break: break-all;
  border: none;
  outline: none;

  &:hover {
    background-color: ${(props) => props.theme.hoverBgColor};
  }
`;

const Devider = styled.div`
  padding: 0.25rem 0.75rem;
`;

const Area = styled.div<IAreaProps>`
  overflow: auto;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "rgba(255,255,255,0.6)"
      : props.isDraggingFromThis
      ? "transparent"
      : "transparent"};
  flex-grow: 1;
  min-height: 0.1rem;
  max-height: 50vh;
  transition: all 0.3s ease-in-out;
  scrollbar-gutter: stable;

  &:active,
  &:hover {
    overflow: auto;
  }

  &::-webkit-scrollbar {
    width: 0.25rem;
  }

  &::-webkit-scrollbar-thumb {
    height: 4px;
    border-radius: 0.25rem;
    visibility: hidden;
  }
  &::-webkit-scrollbar-track {
    visibility: hidden;
  }
  &:active::-webkit-scrollbar-thumb,
  &:hover::-webkit-scrollbar-thumb,
  &:focus::-webkit-scrollbar-thumb {
    visibility: visible;
    background: #d99090;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  input {
    width: 90%;
    padding: 0.875rem 0.5rem;
    background-color: ${(props) => props.theme.boardColor};
    color: ${(props) => props.theme.fontSubColor};
    border: none;
    border-radius: 1rem;
    outline: none;
    font-size: 0.875rem;
  }
  button {
    padding: 0;
    color: ${(props) => props.theme.fontSubColor};
    background-color: transparent;
    cursor: pointer;
    border: none;

    IoIosAdd {
      margin-top: 0.25rem;
    }
  }
`;

function Board({ toDos, boardId, index }: IBoardProps) {
  const setToDos = useSetAtom(toDosAtom);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const createCard = ({ toDo }: IForm) => {
    const now = new Date();

    const newToDo = {
      id: Date.now(),
      text: toDo,
      date: `${Months[now.getMonth()]} ${now.getDate()}`,
    };

    setToDos((allBoards) => {
      localStorage.setItem(
        "toDos",
        JSON.stringify({
          ...allBoards,
          [boardId]: [newToDo, ...allBoards[boardId]],
        })
      );
      return { ...allBoards, [boardId]: [newToDo, ...allBoards[boardId]] };
    });

    setValue("toDo", "");
  };

  const updateBoard = () => {
    const newBoardId = window
      .prompt("更新したいタイトルをご入力ください🖊️", boardId)
      ?.trim();

    if (newBoardId !== undefined) {
      if (newBoardId === "") {
        alert("テキストを入力してください🖊️");
        return;
      }

      setToDos((allToDos) => {
        const allBoards = Object.keys(allToDos);

        if (allBoards.includes(newBoardId)) {
          alert("すでに存在しているタイトルです🧐");
          return allToDos;
        }

        const copyToDos = { ...allToDos };
        const { [boardId]: value, ...restToDos } = copyToDos;
        const newToDos = { ...restToDos, [newBoardId]: value };
        localStorage.setItem("toDos", JSON.stringify(newToDos));
        return newToDos;
      });
    }
  };

  const deleteBoard = () => {
    setToDos((allTodos) => {
      const newToDos = { ...allTodos };
      const { [boardId]: _, ...updateTodos } = newToDos;
      localStorage.setItem("toDos", JSON.stringify(updateTodos));
      return updateTodos;
    });
  };

  return (
    <Draggable
      draggableId={`board-${boardId}`}
      key={`board-${boardId}`}
      index={index}
    >
      {(provided, snapshot) => (
        <Wrapper ref={provided.innerRef} {...provided.draggableProps}>
          <BoardHeader {...provided.dragHandleProps}>
            <button onClick={deleteBoard}>
              <IoCloseOutline size={18} />
            </button>
          </BoardHeader>
          <Title onClick={updateBoard}>{boardId}</Title>
          <Devider></Devider>
          <Droppable droppableId={boardId}>
            {(provided, info) => (
              <Area
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggableCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                    toDoDate={toDo.date}
                    boardId={boardId}
                  />
                ))}
                {provided.placeholder}
              </Area>
            )}
          </Droppable>
          <Devider></Devider>
          <Form onSubmit={handleSubmit(createCard)}>
            <button type="submit">
              <IoIosAdd size={20} />
            </button>
            <input
              {...register("toDo", {
                required: true,
              })}
              type="text"
              placeholder="タスクをご入力ください"
              autoComplete="false"
            />
          </Form>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default memo(Board);
