import React from 'react';
import s from "./Auth.module.scss";
import cn from 'classnames'

class Auth extends React.Component {
    constructor(props) {
        super(props); //creating a state to implement data entry
        this.state = {userName: '', roomId: this.props.id};
    }


    onEnter() {
        const {roomId, userName} = this.state
        if (!userName || !roomId) { //checking the entered data
            return alert('Введите даннные для входа')
        } else {
            this.props.authentificated({roomId, userName}) //dispatching thunk, if the data is entered correctly

        }
    }

    render() {

        return <div className={cn(s.auth, 'input-group-text')}>
            <input type="text" className={cn('form-control', s.input)} placeholder="ID комнаты"
                   value={this.state.roomId} onChange={e => {
                this.setState({roomId: e.target.value})
            }}/>
            <input type="text" className={cn('form-control', s.input)} placeholder="Имя" value={this.state.userName}
                   onChange={e => {
                       this.setState({userName: e.target.value})
                   }}/>
            <button type="button" onClick={() => this.onEnter()} className={cn('btn btn-success', s.btn)}>Войти</button>
        </div>
    }
}

export default Auth