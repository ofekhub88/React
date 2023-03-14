import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import DeleteItem from "./DeleteItem";
import CreateItem from "./CreateItem";
import ListOfItems from "./ListOfItems";


const App = () => {

  const [items, setItems] = useState([]);
 
  
  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const OnedeleteLastItem = (DeleteItem) => {
    setItems(items.slice(0, -1));
  };

  



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">ReactND - Coding Practice</h1>
      </header>
  
      <h2>Shopping List</h2>
      
      <CreateItem onAddItem={addItem}/>

      <DeleteItem items={items} OnedeleteLastItem={OnedeleteLastItem}/>

      <p className="items">Items</p>
      <ListOfItems items={items} />
    </div>
  );
};

export default App;
