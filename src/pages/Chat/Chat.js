import s from './Chat.module.scss'
import cn from "classnames";
import react from "react";
import socket from "../../socket";
import moment from "moment";

const Chat = ({userName, roomId, users, messages, addMessage}) => {
    const ref = react.useRef(null)
    react.useEffect(()=>{
        ref.current.scrollTo(0, 99999) //implementation of autoscrolling when messages was arrived
    },[messages])
    const [messageValue, setMessageValue] = react.useState('')//creating a state to implement data entry
    const sendNewMessage = (e) => {
        socket.emit('ROOM:NEW__MESSAGE', { //sending message data via a socket channel
            userName,
            roomId,
            text: messageValue,
            date: moment().format('LT') //determining the current time
        })
        addMessage({//rendering our chat messages
            userName,
            text: messageValue,
            date: moment().format('LT')
        })
        e.preventDefault()
        setMessageValue('') //clearing textarea
    }

    return <div className={cn(s.chatBlock, 'container', 'input-group-text')}>
        <div className={cn('row', s.row)}>
            <div className={cn(s.leftSide, 'col')}>
                <h2>Комната {roomId}</h2>
                <br/>
                <h4>Онлайн({users.length})</h4> {/*number of users in the room*/}
                <ul>{users.map((user) => <li key={user + roomId} className={cn(s.user)}>{user}</li>//rendering a list of users
                )}</ul>
            </div>
            <div className={cn(s.rightSide, 'col')}>

                <div className={cn(s.messages)} ref={ref}>

                    {
                        messages.map((message,index) =>
                            message.text&&<div key={message.date+index} className={cn(s.message)}>{/*rendering messages*/}
                                <div className={cn(s.message__text)}><span>{message.text}</span></div>
                                <div className={cn(s.message__description)}>
                                    <span>{message.userName}</span>
                                    <div className={cn(s.message__date)}>
                                        {message.date}
                                    </div>
                                </div>
                            </div>
                        )}

                </div>

                <form className={cn(s.form)}>
                    <textarea className={cn("form-control", s.textarea)} rows={3} value={messageValue}
                              onChange={(e) => {
                                  setMessageValue(e.target.value)
                              }}></textarea>
                    <button onClick={sendNewMessage} className={cn('btn btn-success', s.btn)}>Отправить
                    </button>
                </form>
            </div>
        </div>
    </div>
}
export default Chat