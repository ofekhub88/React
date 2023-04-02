
import {connect} from "react-redux";

const ErrorPage = () => {
    return (
        <div style={{ textAlign: "center"}}>
            <h1 className="text-3xl font-bold mt-9 " style={{ color: "red"}}>Error 404</h1>
            <h2 className="text-2xl font-bold mt-9">Page not found</h2>

        </div>
    );
};

const mapStateToProps = ({autherUser}) => ({autherUser: autherUser});

export default connect(mapStateToProps)(ErrorPage);
 
