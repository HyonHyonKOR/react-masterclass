import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { ITodo, toDosAtom } from "../atoms";
import { useSetAtom } from "jotai";
import { IoIosAdd } from "react-icons/io";
import { Months } from "../types/Months";

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IForm {
  toDo: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  padding: 0.5rem;
  background: ${(props) => props.theme.boardColor};
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
  border: solid 1px ${(props) => props.theme.borderColor};
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  padding: 0.75rem 0.75rem 1.25rem 0.75rem;
  color: ${(props) => props.theme.fontMainColor};
  font-size: 1.25rem;
  font-weight: 600;
  word-break: break-all;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "rgba(255,255,255,0.6)"
      : props.isDraggingFromThis
      ? "transparent"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  input {
    width: 90%;
    padding: 1rem 0.5rem;
    background-color: ${(props) => props.theme.boardColor};
    color: ${(props) => props.theme.fontSubColor};
    border: none;
    border-radius: 1rem;
    outline: none;
    font-size: 1rem;
  }
  button {
    padding: 0;
    color: ${(props) => props.theme.fontSubColor};
    background-color: transparent;
    cursor: pointer;
    border: none;
  }
`;

export default function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetAtom(toDosAtom);

  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
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

  return (
    <Wrapper>
      <Title>{boardId}</Title>
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
      <Form onSubmit={handleSubmit(onValid)}>
        <button type="submit">
          <IoIosAdd size={25} />
        </button>
        <input
          {...register("toDo", {
            required: true,
          })}
          type="text"
          placeholder="Add a Task"
          autoComplete="false"
        />
      </Form>
    </Wrapper>
  );
}
