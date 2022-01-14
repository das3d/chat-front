import React from 'react';
import s from "./Auth.module.scss";
import cn from 'classnames'
import {joinRoom} from "../../DAL/API";
import axios from "axios";
import {authentificated} from "../../redux/auth_reducer";
import {connect} from "react-redux";
class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userName: '', roomId:''};
    }
    onEnter() {
        const {userName, roomId} = this.state
if(!userName || !roomId){
    return alert('Введите даннные для входа')
}else{
    this.props.authentificated(this.state)
    }
    }
    render() {

        return <div className={cn(s.auth, 'input-group-text')}>
            <input type="text" className={cn('form-control', s.input)} placeholder="ID комнаты" value ={this.state.roomId} onChange={e=>{this.setState({roomId: e.target.value})}}/>
            <input type="text"  className={cn('form-control', s.input)} placeholder="Имя" value ={this.state.userName} onChange={e=>{this.setState({userName: e.target.value})}}/>
            <button type="button" onClick={()=>this.onEnter()} className={cn('btn btn-success', s.btn)}>Войти</button>
        </div>
    }
}

export default Auth