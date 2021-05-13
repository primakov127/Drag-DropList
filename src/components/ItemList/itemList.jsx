import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import "./itemList.css";

const ItemList = ({ id, items, onAdd, onRemove }) => {
  const [inputText, setInputText] = useState("");

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <Droppable droppableId={id} key={id}>
      {(provided, snapshot) => {
        return (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="item-list">
            {items.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => {
                    return (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {item.content}
                        <button onClick={() => onRemove(id, item.id)}>X</button>
                      </li>
                    );
                  }}
                </Draggable>
              );
            })}
            {provided.placeholder}
            <input value={inputText} onChange={handleChange} type="text" />
            <button onClick={() => onAdd(id, { id: uuidv4(), content: inputText })}>Add</button>
          </ul>
        );
      }}
    </Droppable>
  );
};

export default ItemList;
