const Chat = ({username,messages}) =>{
    return(
    <div>

    <ul className="message-list">
      {messages.map((message, index) => (
        <li
          key={index}
          className={
            message[index].username === username
              ? "message sender"
              : "message recipient"
          }
        >
          <p>{`${message[index].username}: ${message[index].text}`}</p>
        </li>
      ))}
    </ul>
    </div>
    )
}

export default Chat