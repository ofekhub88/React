
import { formatDate } from "../data/utils";
import {  Link } from "react-router-dom";
import { connect } from "react-redux";

const Question = (props) => {
 
  const {author,
      timestamp,
      optionOne,
      optionTwo,
      id
    } = props.question;

    if (props.user === undefined)
    {
      return null
    }

const user_name = props.user.name
const user_id = props.user.id
const user_questions = props.user.question ? props.user.question : null

   
    return(

      <div className="card border-success mb-3" style={{"max-width": "18rem;"}}>
        <div className="card-header">
          <img className="rounded  thumbnail-box-shadow: d-block"   width="30" height="30" src={process.env.PUBLIC_URL + '/img/' + user_id + '.JPG'} alt={`Avatar of ${author}`}  />
          <span>{user_name}</span></div>
            <div className="card-body">
               <h5 className="card-title">Created on : {formatDate(timestamp)}</h5>
             
            </div>
            
            <Link to={"/question/id="+id} >
            <div class="card-footer bg-transparent border-success">
             {props.voted ? "View" : "Vote for this poll"}
              </div>
              </Link> 
            
        </div>
      
    );
    
};


function mapStateToProps({  users, questions }, { id }) {

    const question = questions[id];
    
    const user = question ? users[question.author]  : null ;
    return {
      question: question,
      user: user

    }
  }
  
  export default connect(mapStateToProps)(Question);