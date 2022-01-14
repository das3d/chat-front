import {joinRoom} from "../DAL/API";
import socket from "../socket";

let initialState = {
    isAuth: false, roomId: null, userName:null
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'auth/ON_LOGIN': {
            return {...state, isAuth: true, roomId: action.payload.roomId, userName: action.payload.userName}
        }
        default:
            return state
    }

}
const onLogin = (payload) => ({
    type: 'auth/ON_LOGIN', payload
})
export const authentificated = (payload) => {
    return async (dispatch) => {
        let data = await joinRoom();
        socket().emit('ROOM:JOIN', payload)
        if (data) {

            dispatch(onLogin(payload));
        }
    }
}
export default authReducer