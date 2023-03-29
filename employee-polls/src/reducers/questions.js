import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from "../actions/questions";

export  function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case ANSWER_QUESTION:
      console.log(state[action.qid].optionOne.votes );
      return {
      
        ...state,
        [action.qid]: {
          ...state[action.qid],
            optionOne: { ...state[action.qid].optionOne,
               votes: action.answer === "optionOne"  ?
                {...state[action.qid].optionOne.votes.filter(
                (uid) => uid !== action.authedUser
               ).concat(action.authedUser)}
               :
               {
               ...state[action.qid].optionOne.votes.filter(
                (uid) => uid !== action.authedUser)
               }},
            optionTwo: { ...state[action.qid].optionTwo,
                votes: action.answer === "optionTwo" ?
                 {...state[action.qid].optionTwo.votes.filter(
                 (uid) => uid !== action.authedUser
                ).concat(action.authedUser)}
                :
                {
                ...state[action.qid].optionTwo.votes.filter(
                 (uid) => uid !== action.authedUser)
                }
              }
      }
      };
    case ADD_QUESTION:
      const { question } = action;
      
      return {
        ...state,
        [action.question.id]: action.question,
      };
    default:
      return state;
  }
}