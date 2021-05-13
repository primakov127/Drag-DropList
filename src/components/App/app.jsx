import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import DragDropItem from "../DragDropItem/dragDropItem";
import DragDropList from "../DragDropList/dragDropList";
import DragDropListsContext from "../DragDropListsContext/dragDropListsContext";

import ItemList from "../ItemList/itemList";

const items = [
  { id: uuidv4(), content: "item1" },
  { id: uuidv4(), content: "item2" },
  { id: uuidv4(), content: "item3" },
  { id: uuidv4(), content: "item4" },
  { id: uuidv4(), content: "item5" },
  { id: uuidv4(), content: "item6" },
];

const itemLists = {
  [uuidv4()]: {
    items: items,
  },
  [uuidv4()]: {
    items: [],
  },
};

// const App = () => {
//   const [lists, setLists] = useState(itemLists);

//   const handleAddToList = (listId, item) => {
//     const destList = lists[listId];
//     const destItems = [...destList.items, item];

//     setLists({
//       ...lists,
//       [listId]: {
//         items: destItems,
//       },
//     });
//   };

//   const handleRemoveFromList = (listId, itemId) => {
//     const destList = lists[listId];
//     const deletedItemIndex = destList.items.findIndex((i) => i.id === itemId);
//     const destItems = [...destList.items];
//     destItems.splice(deletedItemIndex, 1);

//     setLists({
//       ...lists,
//       [listId]: {
//         items: destItems,
//       },
//     });
//   };

//   const onDragEnd = (result) => {
//     if (!result.destination) return;
//     const { source, destination } = result;

//     if (source.droppableId !== destination.droppableId) {
//       const sourceList = lists[source.droppableId];
//       const destList = lists[destination.droppableId];
//       const sourceItems = [...sourceList.items];
//       const destItems = [...destList.items];
//       const [removed] = sourceItems.splice(source.index, 1);
//       destItems.splice(destination.index, 0, removed);
//       setLists({
//         ...lists,
//         [source.droppableId]: {
//           ...sourceList,
//           items: sourceItems,
//         },
//         [destination.droppableId]: {
//           ...destList,
//           items: destItems,
//         },
//       });
//     } else {
//       const itemsList = lists[source.droppableId];
//       const copiedItems = [...itemsList.items];
//       const [removed] = copiedItems.splice(source.index, 1);
//       copiedItems.splice(destination.index, 0, removed);
//       setLists({
//         ...lists,
//         [source.droppableId]: {
//           ...itemsList,
//           items: copiedItems,
//         },
//       });
//     }
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       {Object.entries(lists).map(([id, items]) => (
//         <ItemList key={id} id={id} items={items.items} onAdd={handleAddToList} onRemove={handleRemoveFromList} />
//       ))}
//     </DragDropContext>
//   );
// };

const App = () => {
  return (
    <DragDropListsContext>
      <DragDropList>
        <DragDropItem content="item:1 | list:1" />
        <DragDropItem content="item:2 | list:1" />
        <DragDropItem content="item:3 | list:1" />
        <DragDropItem content="item:4 | list:1" />
      </DragDropList>
      <DragDropList>
        <DragDropItem content="item:1 | list:2" />
        <DragDropItem content="item:2 | list:2" />
      </DragDropList>
    </DragDropListsContext>
  );
};

export default App;
