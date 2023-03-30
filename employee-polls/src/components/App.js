import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared"
import LoginPage from "./LoginPage";
import { useEffect, Fragment } from "react";
import Nav from "./Nav";
import New from "./New";
import Home from "./Home";
import QuestionPage from "./QuestionPage";
import Leaderboard from "./Leaderboard";



const App = (props) => {

 
  useEffect (() =>
  { props.dispatch(handleInitialData()) 
      },[]);
  if (props.autherUser === null )
  {
     return ( props.loading === true ? null :   <LoginPage />   
   )
  }

 return (
    <div>
    <Fragment>
      <LoadingBar />
        <div className="container">
           <Nav />
           {props.loading === true ? null : (
             <Routes>
               <Route path="/" exact element={<Home />} /> 
               <Route path="/home"  element={<Home />} /> 
               <Route path="/leaderborad" element={<Leaderboard />} />
               <Route path="/new" element={<New />} />
               <Route path="/question/:id"  element={<QuestionPage />} /> 
               
               
             </Routes>
           )}
      </div>
    </Fragment>
    </div>
  );
};

const mapStateToProps = ({ autherUser,users }) => ({
  loading: users === null,
  autherUser  : autherUser 

}); 
export default connect(mapStateToProps)(App);

/*
<Route path="/" exact element={<Dashboard />} />

<Route path="/new" element={<NewTweet />} />
*/