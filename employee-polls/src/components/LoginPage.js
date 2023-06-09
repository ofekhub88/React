
import { connect } from "react-redux";
import { useState } from "react";
import { handleSetAuther } from "../actions/autherUser"

const LoginPage = (props) => {
  const [selectedUser, setSelectedUser] = useState(null);

  
  
  if (props.autherUser || props.autherUser !== null) {
  
     return null 
  }
  

  const handleChange = id => {

     //  e.preventDefault();
    setSelectedUser(id)
  };
   
    const AddAuther =(e)=> {
        //e.preventDefault();

        props.dispatch(handleSetAuther(selectedUser))

      }
   
    return ( <div className="card">
    <div className="card-header" data-testid="login-card">
      Login into employee polls
    </div>
    <div className="card-body">
          <form onSubmit={(e) => AddAuther(e)}>
          {props.users && Object.keys(props.users).map(id => {
        return ( 
          
          <div className="form-check"  key={id} >
            <input className="form-check-input" type="radio"
            onChange={() => handleChange(id)}
             value={id} 
             checked={selectedUser === id ? true: false}
             data-testid={"checked"+id}
          />

            <label className="form-check-label"  data-testid={id}   onClick={ () => handleChange(id)} > {props.users[id].id +" - " +props.users[id].name}  </label>
            
           
         </div>)})}
         <button className="btn btn-primary" type="submit" 
           disabled ={selectedUser === null} 
           data-testid="Submit">
            Login
          </button>
        </form>
       
      </div>
      </div>
    )};




function mapStateToProps({ users ,autherUser}) {
    return {
      users: users,
      autherUser: autherUser
    };
  }
  
  export default connect(mapStateToProps)(LoginPage);

