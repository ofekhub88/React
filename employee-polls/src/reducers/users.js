import { RECEIVE_USERS }  from "../actions/users"
import { ANSWER_QUESTION , ADD_QUESTION } from "../actions/questions";

export  function users(state = {},action) {
  switch (action.type) {
    case RECEIVE_USERS:
        return {           
            ...state,
            ...action.users
        }
    case ADD_QUESTION:
       const { question } = action
        let user_question = state[question.author].questions.concat(question.id)
        return{           
          ...state,
          [question.author]: {...state[question.author],
            questions: user_question
          }
        };
    case ANSWER_QUESTION:
          let user_answers = state[action.authedUser].answers
          user_answers[action.qid] = action.answer
          return {           
              ...state,
              [action.authedUser]: {...state[action.authedUser],
                answers: user_answers
              }
            };
  
    default:
        return state;
  }
}
