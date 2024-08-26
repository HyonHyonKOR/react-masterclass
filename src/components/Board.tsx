import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { ITodo, toDosAtom } from "../atoms";
import { useSetAtom } from "jotai";
import { IoIosAddCircle } from "react-icons/io";

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
  width: 18rem;
  min-height: 35rem;
  padding: 0.75rem 0 0 0;
  background: ${(props) => props.theme.boardColor};
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1.25rem;
  box-shadow: 0 8px 8px 0 rgba(80, 81, 87, 0.37);
`;

const Title = styled.h2`
  padding: 2rem 1rem 1rem 1rem;
  color: ${(props) => props.theme.fontColor};
  font-size: 1.25rem;
  font-weight: 800;
`;

const Area = styled.div<IAreaProps>`
  padding: 1rem;
  background-color: ${(props) =>
    props.isDraggingOver
      ? props.theme.fontColor
      : props.isDraggingFromThis
      ? "transparent"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
`;

const Form = styled.form`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding: 1.25rem;
    border: none;
    border-radius: 1rem;
    outline: none;
  }
  button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background-color: transparent;
    cursor: pointer;
    border: none;
  }
`;

export default function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetAtom(toDosAtom);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = { id: Date.now(), text: toDo };
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
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: true,
          })}
          type="text"
        />
        <button type="submit">
          <IoIosAddCircle size={35} color="#6D28D9" />
        </button>
      </Form>
    </Wrapper>
  );
}
