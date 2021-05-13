import React, { useMemo } from "react";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import "./dragDropList.css";

const DragDropList = ({ children }) => {
  const droppableId = useMemo(() => uuidv4(), []);

  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <ul className="drag-drop-list" ref={provided.innerRef} {...provided.droppableProps}>
          {React.Children.map(children, (child, index) => React.cloneElement(child, { ...child.props, index }))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default DragDropList;
