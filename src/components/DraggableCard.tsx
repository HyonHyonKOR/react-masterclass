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
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  margin-bottom: 5px;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
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
