import {  useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDate } from "../data/utils";
import { useState } from "react";
import { handleAnswerQuestion } from "../actions/questions";


const withRouter = (Component) => {
   const ComponentWithRouterProp = (props) => {
     const { id }  = useParams();
     const q_id = id.split("=")[1]
   
     return <Component {...props} qid={{ q_id }} />;
   };
 
   return ComponentWithRouterProp;
 };
 


const QuestionPage = (props) => {
  
  const [ selectedOption,setSelectedOption ] = useState(null);
  
  const handleChange = option => {
       setSelectedOption(option)
  };
  
  const navigate = useNavigate();
  
if ( props.question  === undefined  || 
   props.user === undefined){
    return (
        null
           ) ;
       }

const handleAnser= (e) => {
   e.preventDefault();

   props.dispatch(handleAnswerQuestion({
      authedUser: props.autherUser,
       qid: props.question.id,
       answer: selectedOption
   }));
    
    navigate("/home");
    selectedOption(null)
   
}

const {author,
       timestamp,
       optionOne,
       optionTwo} = props.question;
  
const user_name = props.user.name;
const user_id = props.user.id;


return( 
 
    <div className="card text-center">
    <div className="card-header">
       <img className="rounded  rounded mx-auto d-block"   width="60" height="80" src={process.env.PUBLIC_URL + '/img/' + user_id + '.JPG'} alt={`Avatar of ${author}`}  />
       <span>{user_name}</span>
    </div>
    
    <div className="card-body">
      <h5 className="card-title">Youd You rather ? </h5>
      <form onSubmit={(e) =>handleAnser(e)}>
          <div className="custom-control custom-checkbox"   style={{ padding: 15}} key="2" >
            <input className="form-check-input" type="radio" 
                   style={{ padding: 8}}
                   onChange={() => handleChange("optionOne")}
                    checked={selectedOption === "optionOne" ? true: false} 
           />
           <label  className="form-check-label"  
               style={{ paddingLeft: 10}} 
               onClick={ () => handleChange("optionOne") }>
               {optionOne.text +"- ( Voted: "+props.statCount.optOneVotesNo+" , "+100*props.statPerc.optOneVotesPerc+" % )" }
                </label>
         </div>
                    <h6>  OR </h6>
         <div className="custom-control custom-checkbox"  style={{ padding: 15}} key="1" > 
             <input className="form-check-input" type="radio"
                onChange={()  => handleChange("optionTwo")}
                 style={{ padding: 8}}
                 checked={selectedOption === "optionTwo" ? true: false} 
             />
            <label  className="form-check-label" 
                    style={{ paddingLeft: 10}} 
                    onClick={ () => handleChange( "optionTwo")} > 
                    
                 { optionTwo.text +"- ( Voted: "+props.statCount.optTwoVotesNo+" , "+100*props.statPerc.optTwoVotesPerc+" % )"  } 
            </label>
         </div>
         <button className="btn btn-primary"
             type="submit" 
             disabled={ selectedOption in [null,undefined]} >  
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


function mapStateToProps({ users, questions ,autherUser},props) {
  
   const question = questions[props.qid.q_id];
   const user = question ? users[question.author]  : null ;

   const statCount= {
          optOneVotesNo: question.optionOne.votes.length,
          optTwoVotesNo: question.optionTwo.votes.length,
   }
   let total_votes = statCount.optOneVotesNo + statCount.optTwoVotesNo
   const statPerc = {
      optOneVotesPerc: total_votes === 0 ? 0 : statCount.optOneVotesNo /total_votes,
      optTwoVotesPerc: total_votes === 0 ? 0 : statCount.optTwoVotesNo /total_votes
   }
       
   return {
         autherUser,
      question: question,
      user: user,
      statPerc: statPerc,
      statCount: statCount,
      questions: questions

    }
};

export default withRouter(connect(mapStateToProps)(QuestionPage));