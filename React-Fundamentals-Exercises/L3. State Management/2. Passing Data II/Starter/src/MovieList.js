const MovieList = ({users,movieToUser})=> {

  return (
    <div>
      <ul> 
      {Object.keys(movieToUser).map((id) => {
        return (
            <li key={movieToUser[id].name}>Name: {movieToUser[id].name}
            <ul>       
            { movieToUser[id].users.length === 0 ?
            ( <p> None of the current users liked this movie</p>) : ( 
            movieToUser[id].users.map((user, index) => {
             return (<li key={user.userID}>User: {users[user.userID].name}</li>)})
             )
             }  
            </ul>
</li>
            
          
        );
      })}
      </ul>
    </div>
  );
}

export default MovieList
