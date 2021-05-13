import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';

import ItemList from "../ItemList/itemList";

const items = [
  { id: uuidv4(), content: "item1" },
  { id: uuidv4(), content: "item2" },
  { id: uuidv4(), content: "item3" },
  { id: uuidv4(), content: "item4" },
  { id: uuidv4(), content: "item5" },
  { id: uuidv4(), content: "item6" }
]

const itemLists = {
  [uuidv4()]: {
    items: items
  },
  [uuidv4()]: {
    items: []
  }
}

const App = () => {

  const [lists, setLists] = useState(itemLists);

  const handleAddToList = (id, item) => {
    const destList = lists[id];
    const destItems = [...destList.items, item];

    setLists({
      ...lists,
      [id]: {
        items: destItems
      }
    })
  };

  const onDragEnd = result => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceList = lists[source.droppableId];
      const destList = lists[destination.droppableId];
      const sourceItems = [...sourceList.items];
      const destItems = [...destList.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setLists({
        ...lists,
        [source.droppableId]: {
          ...sourceList,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destList,
          items: destItems
        }
      });
    } else {
      const itemsList = lists[source.droppableId];
      const copiedItems = [...itemsList.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setLists({
        ...lists,
        [source.droppableId]: {
          ...itemsList,
          items: copiedItems
        }
      });
    }

    
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.entries(lists).map(([id, items]) => <ItemList key={id} id={id} items={items.items} onAdd={handleAddToList}/>)}
    </DragDropContext>
  );
};

export default App;