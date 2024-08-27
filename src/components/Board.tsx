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
  width: 25rem;
  padding: 0.75rem;
  background: ${(props) => props.theme.boardColor};
  border-radius: 0.25rem;
  box-shadow: 0 2px 2px 0 rgba(80, 81, 87, 0.37);
`;

const Title = styled.h2`
  padding: 0.75rem;
  color: ${(props) => props.theme.fontColor};
  font-size: 1.25rem;
  font-weight: 800;
`;

const Area = styled.div<IAreaProps>`
  padding: 1rem 0;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "rgba(255,255,255,0.9)"
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
    color: ${(props) => props.theme.fontColor};
    border: none;
    border-radius: 1rem;
    outline: none;
    font-size: 1rem;
  }
  button {
    padding: 0;
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
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
      <Form onSubmit={handleSubmit(onValid)}>
        <button type="submit">
          <IoIosAdd size={25} color="#4D4D4D" />
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
