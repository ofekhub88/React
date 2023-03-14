
 
const User=({ user ,showGamesPlayed}) =>{
   
   
    return (
        <div>
        <li key={user.username}> 
         {user.userName} Number of  Games Played: {showGamesPlayed === "Hide"? user.games : "*"}
        </li>
      </div>
      );
    

}
//<button onClick={handlegameHide()}> "HJHJHJH" </button> 
export default User