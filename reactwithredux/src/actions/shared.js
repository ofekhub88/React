import API from "goals-todos-api";
import {addTodo, removeTodo} from "./todos"
import {addGoal,removeGoal}  from "./goals"

export const RECEIVE_DATA = "RECEIVE_DATA";

function receiveData(todos, goals) {
  return {
    type: RECEIVE_DATA,
    todos,
    goals,
  };
}

export  function handleInitialData() {
  return (dispatch) => {
    return Promise.all([API.fetchTodos(), API.fetchGoals()]).then(
      ([todos, goals]) => {
        dispatch(receiveData(todos, goals));
      }
    );
  };
}

export  function handleAddItem(state_name,item,cb) {
  return (dispatch) => {
    switch(state_name) {
      case "todo":
          return API.saveTodo(item).then(todo => {
            dispatch(addTodo(todo));
            cb();
            })
            .catch(() => {
              alert("There Was an error . Try again .");
          });
      case "goal": 
          return API.saveGoal(item).then(goal => {
            dispatch(addGoal(goal));
            cb();
            })
            .catch(() => {
              alert("There Was an error . Try again .");
          });
    }
  }; 
};

export  function handleDelete(list,item) {
  return (dispatch) => {
    
    switch(list) {
       case "todos":
           dispatch(removeTodo(item.id));
          return API.deleteTodo(item.id).catch(() => {
             dispatch(addTodo(item));
            alert("An error occurred. Try again.");
          });

       case "goals":
           dispatch(removeGoal(item.id));
           return API.deleteGoal(item.id).catch(() => {
             dispatch(addGoal(item));
            alert("An error occurred. Try again.");
           });
  }
  };

}