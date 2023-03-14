
export default function Rendering({users,movieToUser}) {
  const employees = [
    {id: 1, name: 'Alice', tasks: ['dev', 'test', 'ship']},
    {id: 2, name: 'Bobby Hadz', tasks: ['design', 'test']},
    {id: 3, name: 'Carl', tasks: ['test']},
  ];
  return (
    <div>
      <ul> 
      {Object.keys(movieToUser).map((id) => {
        return (
            <il key={movieToUser[id].name}>Name: {movieToUser[id].name}
<ul>       
            { movieToUser[id].users.length === 0 ?
            ( <p> None of the current users liked this movie</p>) : ( 
            movieToUser[id].users.map((user, index) => {
              const userId = user.userID
              return (<p>User: {users[userId].name}</p>)
            }
            ))}
            </ul>
</il>
            
          
        );
      })}
      </ul>
    </div>
  );
}
