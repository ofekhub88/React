import { useState } from "react";

const CreateUser=({ users,OnAddUser })=>
{
    const [userExists,setuserExists] = useState("")
    const [user,setUser]   =  useState({
    "userName": "",
    "firstName": "",
    "lastname": ""})

    const checkUserExists = (currUsername) => {
        for (let user of users) {
          if (user.userName === currUsername) {
            return true;
          }
        }
        return false;
      };

    const HandleUserChange = (event) =>{
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handladdUser = (event) => {
        event.preventDefault();
        if (checkUserExists(user.userName))
        {
            setuserExists("username "+user.userName+" Already Exists. ")  
        } else {
        setuserExists("")
        OnAddUser(user);
        setUser({
        "userName": "",
        "firstName": "",
        "lastName": ""});
      }};
      const IsInputHasValues =() =>
      (user.firstName ==="" |
       user.lastName === ""|
       user.userName === "");

    return (
        <div>
        <form onSubmit={handladdUser}>
    
        <input
          type="text"
          name="firstName"
          placeholder="Enter First Name"
          value={user.firstName}
          onChange={HandleUserChange}
        /> 
        <br></br>
        <input
          name="lastName"
          type="text"
          placeholder="Enter Last Name"
          value={user.lastName}
          onChange={HandleUserChange}
        />
    <br></br>
         <input
          name="userName"
          type="text"
          placeholder="Enter username"
          value={user.userName}
          onChange={HandleUserChange}
        />
         <br></br>
        <button disabled={IsInputHasValues()} >Add User</button>
      </form>
       <p style={{color:"red"}}> {userExists}</p>
      </div>
      );
    

}

export default CreateUser