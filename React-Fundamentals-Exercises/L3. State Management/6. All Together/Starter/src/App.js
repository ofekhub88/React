import logo from "./logo.svg";
import "./App.css";
import CreateUser from "./CreateUser";
import UserList from "./UserLists";
import { useState } from "react";

const App = () => {
  const [users,setUsers] = useState([])

  const handleOnAddUser = (newUser) => 
  {
  
    newUser.games= 0;
    setUsers([...users,newUser]);
    console.log(users)
  }
  return (
    <div className="rectangle">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">ReactND - Coding Practice</h1>
      </header>
      <div className={"rectangle"}>
        <div className="solid"> 
        <div className="solid"> 
      <CreateUser users={users} OnAddUser={handleOnAddUser}/>
      </div>
      <div className="solid"><UserList users={users}/></div>
      
      </div>
      </div>
    </div>
  );
};

export default App;
