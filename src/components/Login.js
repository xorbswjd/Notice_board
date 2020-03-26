import React from 'react';
import { createBrowserHistory } from 'history';
import '../css/bootstrap.css';
import './login.css';

const browserHistory = createBrowserHistory();

class Login  extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            user: [{
                userID: '',
                userPassword: '',
                userName: ''
            }]
        };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handlePassWordChange = this.handlePassWordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIdChange(event) {
        this.setState({id: event.target.value});
    }

    handlePassWordChange(event) {
        this.setState({password: event.target.value});
    }
    
    handleSubmit() {
        var check = 0;
        for(var i =0; i < this.state.user.length; i++) {
            if(this.state.id === this.state.user[i].userID) {
                check = 1;
                if(this.state.password === this.state.user[i].userPassword) { 
                    window.sessionStorage.setItem('id', this.state.id);
                    browserHistory.push('/');
                    break;
                } else {
                    console.log('비밀번호 확인');
                    this.idInput.focus();
                }
            }
        }
        if(check === 0) {
            console.log('아이디 확인');
            this.idInput.focus();
        }
    };
    
  componentDidMount() {
    fetch('api/user')
        .then(res=>res.json())
        .then(data=>this.setState({user:data.user}));

    }

    render () {  
        return (
            <div className="container">
                <div className="col-lg-4">
                    <div className ="jumbotron" >
                        <form onSubmit={this.handleSubmit}>
                            <h3>로그인 화면</h3>
                            &nbsp;
                            <div className ="form-group">
                                <input 
                                    type ="text" 
                                    className="form-control" 
                                    placeholder="아이디" 
                                    value = {this.state.id} 
                                    onChange = {this.handleIdChange} 
                                    ref = { (ref) =>{ this.idInput = ref } } 
                                />
                            </div>
                            <div className ="form-group">
                                <input  
                                    type ="password" 
                                    className="form-control" 
                                    placeholder="비밀번호" 
                                    value = {this.state.password} 
                                    onChange = {this.handlePassWordChange}
                                />
                            </div>
                            &nbsp;
                            <input type="submit" className="btn btn-primary form-control" value="로그인"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;