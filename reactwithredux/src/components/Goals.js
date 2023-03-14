import { connect } from "react-redux";
import { useRef } from "react";
import List from "./List";
import { handleAddItem } from "../actions/shared";

const Goals = (props) => {
    const inputRef = useRef();

    const addItem = (e) => {
      e.preventDefault();
      props.dispatch(handleAddItem("goal",
      inputRef.current.value,
      () => (inputRef.current.value = "")
      ));
      
    };

    return (
        <div>
          GOAL
          <h1>Goal List</h1>
          <input type="text" placeholder="Add Goal" ref={inputRef} />
          <button onClick={event => addItem(event)}>Add Gaol</button>
          <List  list="goals" state={props.goals} dispatch={props.dispatch}/>
        </div>
      );
    };

export default connect((state) => ({
        goals: state.goals,
      }))(Goals);