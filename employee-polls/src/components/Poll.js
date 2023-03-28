import {  Link } from "react-router-dom";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDate } from "../data/utils";
import { useState } from "react";


const Poll = (props) => {

  const [ selectedOption,setSelectedOption ] = useState(null);
  
  const { id }  = useParams();

  const q_id = id.split("=")[1]


  const handleChange = e => {

    console.log(e.target.value);
       e.preventDefault();
       setSelectedOption(e.target.value)
  };
  const question = props.questions[q_id];

  
  if ( question === undefined  ){
    return (
        null
    ) ;
}



 const user = question ? props.users[question.author]  : null ;
 const {author,
  timestamp,
  optionOne,
  optionTwo} = question;
const user_name = user.name
const user_id = user.id


   
return( 
 
    <div className="card text-center">
    <div className="card-header">
       <img className="rounded  rounded mx-auto d-block"   width="60" height="80" src={process.env.PUBLIC_URL + '/img/' + user_id + '.JPG'} alt={`Avatar of ${author}`}  />
       <span>{user_name}</span>
    </div>
    
    <div className="card-body">
      <h5 className="card-title">Youd You rather ? </h5>
      <form onSubmit={(e) =>handleChange(e)}>
          <div className="custom-control custom-checkbox"   style={{ padding: 15}} key="2" >
            <input className="form-check-input" 
            type="radio"
            style={{ padding: 8}}
            onChange={(e) => handleChange(e)}
             value={optionOne.text}  
             checked={selectedOption === optionOne.text ? true: false} 
          />
            <label className="form-check-label"  style={{ paddingLeft: 10}}> {optionOne.text} </label>
         </div>
                    <h6>  OR </h6>
         <div className="custom-control custom-checkbox"  style={{ padding: 15}} key="1" >
            <input className="form-check-input" type="radio"
            onChange={(e)  => handleChange(e)}
             value={optionTwo.text}  
             style={{ padding: 8}}
             checked={selectedOption === optionTwo.text ? true: false} 
          />
            <label className="form-check-label" style={{ paddingLeft: 10}}> { optionTwo.text  } </label>
         </div>
         
         <button className="btn btn-primary" type="submit" >
            Submit your choise
          </button>
        </form>

    </div>
    <div className="card-footer text-muted">
    Created on : {formatDate(timestamp)}
    </div>
 </div>
)

};


function mapStateToProps({  users, questions ,authorUser}) {
   return {
         authorUser,
      questions: questions,
      users: users
    }
};

export default connect(mapStateToProps)(Poll);
