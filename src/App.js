import './App.css'
import Auth from "./pages/Auth/Auth";
import {connect} from "react-redux";
import {authentificated} from "./redux/auth_reducer";

function App({isAuth, authentificated}) {

  return (
    <div className="App">
        {!isAuth?<Auth authentificated={authentificated}/>:<></>}
    </div>
  );
}

export default connect((state)=>({isAuth: state.authReducer.isAuth}), {authentificated})(App);
