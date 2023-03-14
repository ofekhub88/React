
import User from "./User";
import { useState } from "react";

const UserList=({ users }) => {

  const [showGamesPlayed,setshowGamesPlayed] = useState("Show")

  const handlegameHide = () =>  {
      setshowGamesPlayed(showGamesPlayed === "Show"? "Hide" : "Show")
  }

  const gamesPlayedButton=() =>(
    <div> <button onClick={handlegameHide} className="smallButton"> 
    {showGamesPlayed} the Number of Games Played </button>
    </div>
  );

    return (
        <div>
         
           {users && users.length > 0 ? gamesPlayedButton() : ""}
          <ol> 
          {users.map(user => {
            return(<User  user={user}  showGamesPlayed={showGamesPlayed} />)
          }
            )
         }
          </ol>
      </div>
      );
    
}

export default UserList
