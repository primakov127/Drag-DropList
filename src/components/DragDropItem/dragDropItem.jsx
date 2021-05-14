import { useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import "./dragDropItem.css";

const DragDropItem = ({ content, index }) => {
  const draggableId = useMemo(() => uuidv4(), []);

  return (
    <Draggable key={index} draggableId={draggableId} index={index}>
      {(provided) => (
        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="drag-drop-item__item">
          {content}
        </li>
      )}
    </Draggable>
  );
};

export default DragDropItem;
