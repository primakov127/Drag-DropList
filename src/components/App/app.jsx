import React from "react";
import DragDropList from "../DragDropList/dragDropList";
import DragDropListsContext from "../DragDropListsContext/dragDropListsContext";

import "./app.css";

const items1 = [{ content: "item1 : list1" }, { content: "item2 : list1" }, { content: "item3 : list1" }, { content: "item4 : list1" }];
const items2 = [{ content: "item1 : list2" }, { content: "item2 : list2" }];

const App = () => {
  return (
    <DragDropListsContext>
      <div className="wrapper">
        <DragDropList items={items1} />
      </div>
      <div className="wrapper">
        <DragDropList items={items2} />
      </div>
    </DragDropListsContext>
  );
};

export default App;
