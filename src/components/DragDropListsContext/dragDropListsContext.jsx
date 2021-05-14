import React, { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";

export const DnDListsContext = React.createContext();

const DragDropListsContext = ({ children }) => {
  const [lists, setLists] = useState({});

  const addList = useCallback((listId, items) => {
    setLists((prevLists) => {
      return { ...prevLists, [listId]: { items } };
    });
  }, []);

  const addItemToList = useCallback((listId, item) => {
    setLists((prevLists) => {
      const list = prevLists[listId];
      let items = [item];
      if (list) {
        items = [...list.items, ...items];
      }
      return {
        ...prevLists,
        [listId]: {
          items: items,
        },
      };
    });
  });

  const onDragEnd = useCallback(
    (result) => {
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
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destList,
            items: destItems,
          },
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
            items: copiedItems,
          },
        });
      }
    },
    [lists]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DnDListsContext.Provider value={{ addList, addItemToList, lists }}>{children}</DnDListsContext.Provider>
    </DragDropContext>
  );
};

export default DragDropListsContext;
