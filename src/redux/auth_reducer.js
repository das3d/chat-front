import {getInfo, joinRoom} from "../DAL/API";
import socket from "../socket";

let initialState = {
    isAuth: false, roomId: null, userName: null, users: [], messages: []
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'auth/ON_LOGIN': {
            return {...state, isAuth: true, roomId: action.payload.roomId, userName: action.payload.userName}
        } //adding information about authorization to redux-state
        case 'auth/SET_MESSAGES': {
            return {...state, messages: [...state.messages, action.payload]}
        } //adding information about current messages to redux-state
        case 'auth/SET_USERS': {
            return {...state, users: action.payload}
        } //adding information about current users to redux-state
        case 'auth/SET_DATA': {
            return {...state, users: action.payload.users, messages: action.payload.messages}
        } //adding information about room to redux-state
        default:
            return state
    }

}
//Action-creators
const onLogin = (payload) => ({
    type: 'auth/ON_LOGIN', payload
})
export const setMessages = (payload) => ({
        type: 'auth/SET_MESSAGES', payload
    }
)

export const setUsers = (payload) => ({
        type: 'auth/SET_USERS', payload
    }
)
export const setData = payload => ({
    type: 'auth/SET_DATA', payload
})

//Thunk
export const authentificated = (payload) => {
    return async (dispatch) => {

        let data = await joinRoom(payload.roomId, payload.userName)//authorization request

        if (data) {
            dispatch(onLogin(payload))//adding information about authorization to redux-state
            socket.emit('ROOM:JOIN', payload)//sending data about connect via a socket channel
            let datar = await getInfo(data.data)//request for information about the room
            dispatch(setData(datar.data))//adding information about room to redux-state

        }
    }
}

export default authReducer