import './App.css'
import {connect} from "react-redux";
import {authentificated, setMessages, setUsers} from "./redux/auth_reducer";
import socket from "./socket";
import react from "react";
import Chat from "./pages/Chat/Chat";
import {Route, Routes} from "react-router-dom";
import AuthContainer from "./pages/Auth/AuthContainer";


const App = ({isAuth, authentificated, setUsers, state, setMessages}) => {

    react.useEffect(() => {
        socket.on('ROOM:JOINED', setUsers) //listening to the channel for notification users of login
        socket.on('ROOM:LEAVE', setUsers) //listening to the channel for notification of the users exit
        socket.on('ROOM:NEW__MESSAGE', setMessages) //listening to the channel for notification of the arrival of messages
    }, [])

    return (
        <div className="App">

            {!isAuth//implementation of a quick transition to the registration window by the link
                ? <Routes>
                    <Route path={'/rooms/:id'} element={<AuthContainer authentificated={authentificated}/>}/>
                    ||<Route path={'/rooms/'} element={<AuthContainer authentificated={authentificated}/>}/>
                </Routes>
                : <Chat {...state} addMessage={setMessages}/>}
        </div>
    );
}

export default connect((state) => ({
    isAuth: state.authReducer.isAuth,
    state: state.authReducer
}), {authentificated, setUsers, setMessages})(App)
