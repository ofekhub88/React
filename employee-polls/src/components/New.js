import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions"

const New = ({ dispatch }) => {

  const navigate = useNavigate();
  const [question, setQuestion] = useState({});

  const handleChangeOptionA = (e) => {
    const text = e.target.value;
    setQuestion(...question,{optionOneText: text});
  };
  const handleChangeOptionB = (e) => {
    const text = e.target.value;
    setQuestion(...question,{optionTwoText: text});
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("===============")
    console.log(question)
    dispatch(handleAddQuestion(question));
    navigate("/home")
    setQuestion({});
    

  };

  //const questionLeft = 280 - text.length;

  return (
    <div>
    <div className="card text-center">
       <div className="card-header">
       <h5 className="card-title">Type your choises</h5>
       </div>
       <form  onSubmit={(e) => handleSubmit(e)}>
       <div className="card-body">
       
        
   
  <div className="form-group">
    <label >Qestion One</label>
    <input value={question["optionOneText"]} type="text" className="form-control" id="a"  placeholder="Enter option one "/>
   
  </div>
  <div className="form-group">
    <label >Qestion Two</label>
    <input value={question["optionTwoText"]} type="text" className="form-control" id="b"  placeholder="Enter option tow"/>
  </div>

  
       </div>
       <div className="card-footer text-muted">
       <button  disabled={question === {} || question["optionOneText"] === ""  || question["optionTwoText"] === ""} className="btn btn-primary">Submit</button>
       
       </div>
       </form>
</div>
</div>
  );
};

export default connect()(New);



/***
 <div>
      <h3 className="center">Compose new Tweet</h3>
      <form className="new-question" onSubmit={(e) => handleSubmit(e)}>
        { todo: Redirect to / if submitted }
        <textarea
          placeholder="What's happening?"
          value={text}
          onChange={(e) => handleChange(e)}
          className="textarea"
          maxLength={280}
        />
        {questionLeft <= 100 && <div className="question-length">{questionLeft}</div>}
        <button className="btn" type="submit" disabled={text === ""}>
          Submit  
        </button>
      </form>
    </div>

    */
