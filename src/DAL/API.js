import axios from "axios";

const instance = axios.create()

export const joinRoom = (roomId, userName) => {
        return instance.post('/rooms',{roomId, userName})
}