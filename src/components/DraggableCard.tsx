import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

interface ICardProps {
  isDragging: boolean;
}

const Card = styled.div<ICardProps>`
  word-break: break-all;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.isDragging ? "white" : props.theme.fontColor)};
  background-color: ${(props) =>
    props.isDragging ? props.theme.fontColor : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging
      ? "0px 8px 8px rgba(0,0,0,0.8)"
      : "0px 2px 5px rgba(0,0,0,0.5)"};
  font-weight: 600;
`;

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
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
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DraggableCard);
