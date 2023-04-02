import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleSetAuther } from "../actions/autherUser"


const Nav = (props) => {

  const handleLogOut = (e) => 
  { props.dispatch(handleSetAuther(null)) ;
     }
    if (!props.user) {
      return null
    }
    const user_name = props.user.name
    const user_id = props.user.id
    return (

  <nav className="navbar navbar-dark bg-primary">
     <Link className="navbar-brand" to="/" >Home </Link>
     <Link className="navbar-brand" to="/leaderborad">LeaderBoard</Link>
     <Link className="navbar-brand" to="/new" >New question  </Link>
     <div>
     <img className="rounded-circle   thumbnail-box-shadow: "  
     width="30" height="30" src={process.env.PUBLIC_URL + '/img/' + user_id + '.JPG'} 
     alt={`Avatar of ${user_id}`}  />
     <span style={{color: "white" ,paddingLeft: 20}}>{user_name}</span>
     </div>
     <button  style={{ color: "white"}} className="btn btn-outline-success" onClick = {(e) => handleLogOut(e)} > Logout  </button> 
    
  </nav>
    )

};

const mapStateToProps = ({users,autherUser}) => {
  return { 
      user: users[autherUser] 
};

};

export default connect(mapStateToProps)(Nav);


