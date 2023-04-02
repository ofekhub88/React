import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';


const Leaderboard = (props) => {
 
  return (
    <div>
  
  <h3 >Empoloyy pools leader board</h3>
 
  <table className="table">

   
    <thead className="head-light" >
    <tr>
      <th scope="col">#</th>
      <th scope="col">Users</th>
      <th scope="col">Answers</th>
      <th scope="col">Questiosn</th>
    </tr>
    
  </thead>
  
  <tbody>
    { props.user_ids.map((id,idx) =>
        <tr>
        <th scope="row" key={idx}>{idx}</th>
        <td >
        <img className="rounded-circle   thumbnail-box-shadow: "  width="30" height="30" src={process.env.PUBLIC_URL + '/img/' +  props.users[id].id + '.JPG'} alt={`Avatar of ${ props.users[id].id}`}  />
         <span style={{ paddingLeft: 10}}> { props.users[id].name }</span></td>
        <td>{Object.keys(props.users[id].answers).length }</td>
        <td>{ props.users[id].questions.length }</td>
      </tr>
     )}
     </tbody></table>
  </div>

  );
};



const mapStateToProps = ({users}) => {
    const users_ids = Object.keys(users).sort((a,b) => 
    Object.keys(users[b].answers).length -  Object.keys(users[a].answers).length)
    console.log(users_ids)
    return { 
        user_ids: users_ids,
        users: users
 };
 
  };

export default connect(mapStateToProps)(Leaderboard);