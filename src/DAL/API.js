import axios from "axios";


const instance = axios.create()



export const joinRoom = (roomId, userName) => {
        return instance.post('/rooms',{roomId, userName}) //request for authorization
}
export const getInfo = (id) => {
        return instance.get(`/rooms/${id}`) //request for information about the room
}
