
import { connect } from "react-redux";
import { useRef } from "react";
import List from "./List";
import { handleAddItem } from "../actions/shared";

const Todos = (props) => {
    const inputRef = useRef();

    const addItem = (e) => {
      e.preventDefault();
      props.dispatch(handleAddItem("todo",inputRef.current.value,
      () => (inputRef.current.value = "")
      ));
     
    };
    return (
        <div>
          TODOS
          <h1>Todo List</h1>
          <input type="text" placeholder="Add Todo" ref={inputRef} />
          <button onClick={(event) => addItem(event)}>Add Todo</button>
          <List  list="todos" state={props.todos} dispatch={props.dispatch}/>
        </div>
      );
    };

    export default connect((state) => ({
        todos: state.todos,
      }))(Todos); 