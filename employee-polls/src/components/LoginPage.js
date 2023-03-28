
import { connect } from "react-redux";
import { useState } from "react";
import { handleSetAuthor } from "../actions/authorUser"
import { Navigate, useNavigate } from "react-router-dom";
import Home  from "./Home"

const LoginPage = (props) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const navidate = useNavigate()
  if (props.authorUser !== null)
  {
     return ( <Home />)
  }
  

  const handleChange = e => {

       e.preventDefault();
    setSelectedUser(e.target.value)
  };
   
    const AddAuthor =(e)=> {
        e.preventDefault();
       if (selectedUser === null) {
        return alert("You have to select User First !");
       }
       else {
        props.dispatch(handleSetAuthor(selectedUser))
        };
      }
   
    return ( <div className="card">
    <div className="card-header">
      Login into employee polls
    </div>
    <div className="card-body">
          <form onSubmit={(e) => AddAuthor(e)}>
          {props.users && Object.keys(props.users).map(id => {
        return ( 
          
          <div className="form-check"  key={id} >
            
            <input className="form-check-input" type="radio"
            onChange={(e) => handleChange(e)}
             value={id}  
             checked={selectedUser === id ? true: false} 
          />

            <label className="form-check-label" value={id}    onClick={(e) => handleChange(e)} > {props.users[id].name}  </label>
            
           
         </div>)})};
         <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
       
      </div>
      </div>
    )};




function mapStateToProps({ users ,authorUser}) {
    return {
      users: users,
      authorUser: authorUser
    };
  }
  
  export default connect(mapStateToProps)(LoginPage);

