import logo from "./logo.svg";
import "./App.css";
import UserChat from "./UserChat";
import { useState } from "react";
const users = [{ username: "Amy" }, { username: "John" }];



const App = () => {
  // If the user did not type anything, he/she should not be allowed to submit.
  const [messages,setMessages] = useState([
    {0:{username: "Amy", text: "Hi, Jon!" }},
    {1: {username: "Amy", text: " are you?" }},
    {2:{ username: "John", text: "Hi, Amy! Good, you?" }},
  ]);

  const AddNewMessage = (newMessage) =>{
    console.log(newMessage)
    const Msg = {}
    Msg[messages.length] = newMessage
    console.log(messages)
    setMessages([...messages,Msg])
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">ReactND - Coding Practice</h1>
      </header>
      <div className="container">
        {users.map(user => 
            <UserChat 
             key={user.username} 
             username={user.username} 
             messages={messages} 
             AddNewMessage={AddNewMessage}/>
          )}
          
  
      </div>
      
    </div>
  );
};

export default App;
