import { handleDelete } from "../actions/shared";
import { handleToggle } from "../actions/todos"
const List = (props) => {
    const list = props.state;

    const DeleteItem =(item => {
          props.dispatch(handleDelete(props.list,item));
        });

    const HandletoggleTodo  = (id => {
      props.dispatch(handleToggle(id));
      
    });
    return (
      <ul>
        {list && list.map(item => {
        return ( <li key={item.id}>
          <span onClick={() => props.list === "todos" ? HandletoggleTodo(item.id):"#"}
          style={{ textDecoration: item.complete ? "line-through" : "none"}} > 
          {item.name} </span> 
          <button onClick={() => DeleteItem(item)}>X</button>
        </li>)
        })}
      </ul>
    );
  };


  export default List