import { Droppable } from "react-beautiful-dnd";
import { IoTrashBinSharp } from "react-icons/io5";
import styled from "styled-components";

const TrashBinContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 15rem;
  height: 15vh;

  div {
    padding: 0.625rem;
    color: ${(props) => props.theme.fontMainColor};
    border: 2px solid ${(props) => props.theme.fontMainColor};
    border-radius: 50%;
  }
`;

export default function TrashBin() {
  return (
    <Droppable droppableId="trashbin">
      {(provided, snapshot) => (
        <TrashBinContainer ref={provided.innerRef} {...provided.droppableProps}>
          <div>
            <IoTrashBinSharp size={28} />
          </div>
        </TrashBinContainer>
      )}
    </Droppable>
  );
}
