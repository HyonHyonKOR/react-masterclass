import { memo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import avatar from "../images/avatar.jpg";
import { BsPencil } from "react-icons/bs";
import { IoCloseOutline, IoTimeOutline } from "react-icons/io5";

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  toDoDate: string;
  index: number;
}

interface ICardProps {
  isDragging: boolean;
}

const Card = styled.div<ICardProps>`
  position: relative;
  word-break: break-all;
  border-radius: 0.5rem;
  padding: 1.5rem 1rem 1rem 1rem;
  margin-bottom: 0.5rem;
  color: ${(props) => (props.isDragging ? "white" : props.theme.fontColor)};
  background-color: ${(props) =>
    props.isDragging ? props.theme.fontColor : props.theme.cardColor};
  box-shadow: ${(props) => "2px 2px 2px rgba(0,0,0,0.2)"};
  font-weight: 600;
  font-size: 1.25rem;
  letter-spacing: -0.1rem;
  line-height: 1.25rem;
`;

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
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
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
}: IDraggableCardProps) {
  const [isHover, setIsHover] = useState(false);
  const onMouseEnter = (event: React.MouseEvent) => {
    setIsHover(true);
  };
  const onMouseLeave = (event: React.MouseEvent) => {
    setIsHover(false);
  };

  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {toDoText}
          <Information>
            <div>
              <IoTimeOutline size={18} />
              <span>{toDoDate}</span>
            </div>
            <img src={avatar} alt="avatar" />
          </Information>
          {isHover ? (
            <Buttons>
              <button>
                <BsPencil size={12} color="#4D4D4D" />
              </button>
              <button>
                <IoCloseOutline size={18} color="#4D4D4D" />
              </button>
            </Buttons>
          ) : null}
        </Card>
      )}
    </Draggable>
  );
}

export default memo(DraggableCard);
