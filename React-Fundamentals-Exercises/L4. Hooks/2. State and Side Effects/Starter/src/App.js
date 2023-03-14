import logo from "./logo.svg";
import "./App.css";
import { useState , useEffect} from "react";


const App = () => {
    const [values,setValues] = useState({"x": 0,"y": 0 ,"z":0,"p":0})
    const [answers,setAnswers] = useState({numQuestions:0,numCorrect:0})

    const handleAnswer = (answer) => 
    {
      const numQ = answers.numQuestions + 1
      const numC = answers.numCorrect
      if (answer === (values.x + values.y + values.z === values.p))
      { setAnswers({numQuestions:numQ,numCorrect:numC+1}) }
       else {setAnswers({numQuestions:numQ,numCorrect:numC})}
       refreshValues();
    }
    const handleTrue=() =>{handleAnswer(true)}
    const handleFalse=() =>{handleAnswer(false)}
    const refreshValues = () => {
      const x = Math.floor(Math.random() * 100);
      const y = Math.floor(Math.random() * 100);
      const z =  Math.floor(Math.random() * 100);
      const p =  Math.floor(Math.random() * 3) +x+ y + z;
      setValues({"x": x,"y": y ,"z":z,"p":p})
    }

    useEffect(() => {
      refreshValues();
    }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">ReactND - Coding Practice</h1>
      </header>
      <div className="game">
        <h2>Mental Math</h2>
        <div className="equation">
          <p className="text">{`${values.x} + ${values.y} + ${values.z} = ${values.p}`}</p>
        </div>
        <button onClick={handleTrue}>True</button>
        <button onClick={handleFalse}>False</button>
        <p className="text">
          Your Score: {answers.numCorrect}/{answers.numQuestions}
        </p>
      </div>
    </div>
  );
};

export default App;
