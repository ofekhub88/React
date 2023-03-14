import corgi from "./corgi.jpg";
import "./App.css";
import React,{ useState } from "react";
const App = () => {
  const [likecounter,setLikecpounter] = useState(0)
  const Addlike = (() => setLikecpounter(likecounter+1))
  return (
    <div className="container">
      <h2>Like this photo!</h2>
      <img src={corgi} alt="Corgi"></img>
      <p>Amount of likes: {likecounter} </p>
      <button onClick={Addlike}> Add Like </button>
    </div>
  );
};

export default App;
