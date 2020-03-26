import React from 'react';
import { createBrowserHistory } from 'history';
import '../css/bootstrap.css';
import './login.css';
var io = require('socket.io-client');

const browserHistory = createBrowserHistory();
const socketClient = io("http://localhost:3003");

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            password: '',
            passwordcheck: '',
            user: [{
                userID: '',
                userPassword: '',
                userName: ''
            }]
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handlePassWordChange = this.handlePassWordChange.bind(this);
        this.handlePassWordCheckChange = this.handlePassWordCheckChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleIdChange(event) {
        this.setState({id: event.target.value});
    }

    handlePassWordChange(event) {
        this.setState({password: event.target.value});
    }

    handlePassWordCheckChange(event) {
        this.setState({ passwordcheck: event.target.value });
    }
    
    addUser(name, id, password) {

        socketClient.on("connect", () => { 
            console.log("connection server"); 
        });
        socketClient.emit("first Request", { data : 'join' });
        socketClient.emit("join", { name, id, password }); 
        socketClient.on("first Respond", req => { 
            if(req.data === "close") {
                socketClient.close();
            }
         });
    }
    
    handleSubmit() {
        var check = 0;
        if(this.state.name) {
            if(this.state.id){
                if(this.state.password) {
                    if(this.state.password === this.state.passwordcheck) {
                        for(var i =0; i < this.state.user.length; i++) {
                            if(this.state.id === this.state.user[i].userID) {
                                check = 1;
                            }
                        }
                        if(check === 1) {
                            console.log('id 중복')
                            this.idInput.focus();
                            check = 0;
                        } else {
                            this.addUser(this.state.name, this.state.id, this.state.password);
                            console.log('성공')
                            browserHistory.push('/');
                        }
                    } else {
                        console.log('passwordcheck 획인')
                        this.passwordcheckInput.focus();
                    }
                }else {
                    console.log('password 없음')
                    this.passwordInput.focus();
                }
            } else {
                console.log('id 없음')
                this.idInput.focus();
            }
        } else {
            console.log('name 없음')
            this.nameInput.focus();
        }
        
    }

    componentDidMount() {
        fetch('api/user')
            .then(res=>res.json())
            .then(data=>this.setState({user:data.user}));
    }

    render () {
        return (
            <div className = "container">
                <div className = "col-lg-4">
                    <div className ="jumbotron">
                        <form onSubmit={this.handleSubmit}>
                            <h3>회원가입 화면</h3>
                            &nbsp;
                            <div className = "form-group">
                                <input 
                                    type ="text" 
                                    className = "form-control" 
                                    placeholder="이름" 
                                    value = {this.state.name} 
                                    onChange = {this.handleNameChange}
                                    ref = { (ref) =>{ this.nameInput = ref } } 
                                />
                            </div>
                            <div className = "form-group">
                                <input 
                                    type ="text" 
                                    className = "form-control" 
                                    placeholder="아이디" 
                                    value = {this.state.id} 
                                    onChange = {this.handleIdChange}
                                    ref = { (ref) =>{ this.idInput = ref } }
                                />
                            </div>
                            <div className = "form-group">
                                <input 
                                    type ="password" 
                                    className = "form-control" 
                                    placeholder="비밀번호" 
                                    value = {this.state.password} 
                                    onChange = {this.handlePassWordChange}
                                    ref = { (ref) =>{ this.passwordInput = ref } } 
                                />
                            </div>
                            <div className = "form-group">
                                <input 
                                    type ="password" 
                                    className = "form-control" 
                                    placeholder="비밀번호 확인" 
                                    value = {this.state.passwordcheck} 
                                    onChange = {this.handlePassWordCheckChange} 
                                    ref = { (ref) =>{ this.passwordcheckInput = ref } }
                                />
                            </div>
                            &nbsp;
                            <input type="submit" className = "btn btn-primary form-control" value="회원가입"/>
                        </form>
                    </div> 
                </div> 
            </div>
        )
    }
}

export default Join;
