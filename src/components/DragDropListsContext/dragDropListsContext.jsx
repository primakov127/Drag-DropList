import { DragDropContext } from "react-beautiful-dnd";

const DragDropListsContext = ({ children }) => {
  const onDragEnd = (result) => {
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
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

export default DragDropListsContext;
