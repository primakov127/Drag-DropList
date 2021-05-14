import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import DragDropItem from "../DragDropItem/dragDropItem";
import { DnDListsContext } from "../DragDropListsContext/dragDropListsContext";

import "./dragDropList.css";

const DragDropList = ({ items }) => {
  const droppableId = useMemo(() => uuidv4(), []);
  const { addList, lists, addItemToList } = useContext(DnDListsContext);
  const [inputText, setInputText] = useState("");

  const currentList = lists[droppableId];
  const renderedItems = currentList ? currentList.items : items;

  const handleClick = useCallback(() => {
    addItemToList(droppableId, { content: inputText });
  }, [inputText]);

  const handleInput = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  useEffect(() => {
    addList(droppableId, items);
  }, []);

  return (
    <div>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <ul className="drag-drop-list__list" ref={provided.innerRef} {...provided.droppableProps}>
            {renderedItems.map((item, index) => (
              <DragDropItem key={index} index={index} content={item.content} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <div className="drag-drop-list__add-bar">
        <input className="drag-drop-list__input-text" type="text" value={inputText} onChange={handleInput} />
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};

export default DragDropList;
