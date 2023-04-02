import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Question from "./Question";
import ReactCardFlip from 'react-card-flip';
import { useState } from "react";

const Home = (props) => {
  const [isFlipped,setisFlipped] = useState(true)
    const handleClick=(e) =>{ 
      e.preventDefault();
      setisFlipped(!isFlipped)
    }
  return (
    <div >
  <h3  style={{textAlign: "center"}} data-testid="home-card"> Employee Pools</h3>

 <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
  <div key="g1"> 
     <div className="container">
        <div className="row" >
          <div className="col-sm-8"> <h4> Pools answered by you </h4></div>
         <div className="col-sm-4"><button className="btn btn-link" 
         style={{ paddingBottom: 12}}
         type="button" onClick={(e) => handleClick(e)}>
          Back to polls you didnt't answer {">"} </button>
         </div>
       </div>
     </div>
  
  <div  className="row row-cols-2 row-cols-md-3 g-15">
  
 
  { props.iVotedToIds.map(id =>
        <Question id={id} voted={true} key={id}/>
      )
}
  </div>
  </div>
  <div key="g2">
    <div className="container">
        <div className="row"><div className="col-sm-8"><h4> Unanswered polls  </h4></div>
         <div className="col-sm-4"><button className="btn btn-link" 
          style={{ paddingBottom: 12}}
         type="button" onClick={(e) => handleClick(e)}>
          View polls answered by you  {">"} </button>
         </div>
       </div>
     </div>
  <div  className="row row-cols-2 row-cols-md-3 g-15">
  
    { props.NotVotedToIds.map(id =>
    
        <Question id = {id} voted={false} key={id}/>)
}
  </div>
  </div>
  </ReactCardFlip>
</div>
     
    
  );
};



const mapStateToProps = ({ questions ,autherUser}) => {
 const iVotedToIds = Object.keys(questions).filter(id => autherUser 
  &&   questions[id].optionOne.votes.concat(
    questions[id].optionTwo.votes).includes(autherUser)
  );
  const NotVotedToIds = Object.keys(questions).filter(id => iVotedToIds && !iVotedToIds.includes(id));

  
  return { 
  iVotedToIds: iVotedToIds.sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
  NotVotedToIds: NotVotedToIds.sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  )
 };
 
  };

export default connect(mapStateToProps)(Home);