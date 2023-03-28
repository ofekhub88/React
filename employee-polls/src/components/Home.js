import { connect } from "react-redux";
import Question from "./Question";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';


const Home = (props) => {
 

  return (
    <div>
  
  <h3 >Empoloyy Pools</h3>
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
    
        <Question id = {id} voted={false} />)
     }
  </div>
</div>
    </div>
  );
};



const mapStateToProps = ({ questions ,authorUser}) => {
 const iVotedToIds = Object.keys(questions).filter(id => authorUser 
  &&   questions[id].optionOne.votes.concat(
    questions[id].optionTwo.votes).includes(authorUser)
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