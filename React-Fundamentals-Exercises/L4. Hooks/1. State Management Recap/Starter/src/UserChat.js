
import { useState } from "react";
import Chat from "./Chat";

const UserChat = ({username,messages,AddNewMessage}) => {
    const [value,setValue] = useState("")
    const HandleChange = (event) => {
        setValue(event.target.value)
        
    }
    const isDisabled = () => {
       return(value === "")
      };
    const handleNewMessage = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        const newMessage =  {"username": username , "text": value};
        AddNewMessage(newMessage);
    }

    return(
         <div>
              <div className="chat-window">
              <h2>Super Awesome Chat</h2>
            
            <div className="name sender">{username}</div>
            <Chat username={username} messages={messages} />
          <form className="input-group" onSubmit={handleNewMessage}>
            <input onChange={HandleChange} 
              type="text"
              className="form-control"
              placeholder="Enter your message..."
              value={value}
            />
            <div className="input-group-append">
              <button className="btn submit-button"
              disabled={isDisabled()}>
                Send
              </button>
            </div>
          </form>
          </div>
      </div>
    )
}

export default UserChat