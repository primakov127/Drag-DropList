import { useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const DragDropItem = ({ content, index }) => {
  const draggableId = useMemo(() => uuidv4(), []);

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {content}
        </li>
      )}
    </Draggable>
  );
};

export default DragDropItem;
