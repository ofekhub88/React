import { connect } from "react-redux";
import Poll from "./Question";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Question from "./Question";


const Home = (props) => {
 
  return (
    <div>
  
  <h3  data-testid="home-card"> >Empoloyy Pools</h3>
 <div className="row">
  <div className="col-sm-5">
  <p className="fs-4">
    Pools i voted already for . </p>
  { props.iVotedToIds.map(id =>
        <Question id = {id} voted={true}/>
      )
}
  </div>
  <div className="col-sm-5 ">
  <p className="fs-4">
  Pools i didnt vote yet </p>
    { props.NotVotedToIds.map(id =>
    
        <Poll id = {id} voted={false} />)
}
  </div>
</div>
     
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