import React from 'react';
import '../css/bootstrap.css';
import './login.css';

class Login  extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  
            id: '',
            password: ''
        };
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handlePassWordChange = this.handlePassWordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.user_login = this.user_login.bind(this);
    }

    handleIdChange(event) {
        this.setState({id: event.target.value});
    }

    handlePassWordChange(event) {
        this.setState({password: event.target.value});
    }
    
    handleSubmit() {
        var id = this.state.id;
        var pw = this.state.password;
        if(!id) {
            alert('아이디을 입력해주세요');
            this.idInput.focus();
        } else if(!pw) {
            alert('비밀번호를 입력해주세요');
            this.pwInput.focus();
        } else {
            this.user_login('http://localhost:3000/api/user_login', id, pw);
        }
    };

    user_login(url, id, password) {
        var data = {'id' : id, 'password' : password};
        data = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', "application/json");
        xhr.send(data);

        xhr.addEventListener('load', function() {
            var result = JSON.parse(xhr.responseText);
            if(result.resule === "ok") {
                alert(result.name + '님 환영합니다.');
                window.sessionStorage.setItem('id', id);
                document.location.href = '/';
            } else if(result.resule === "no") {
                alert('아이디가 존재하지 않습니다.');
            } else if(result.resule === "password_no") {
                alert('비밀번호 확인');
            }
        });
    };

    render () {  
        return (
            <div className="container">
                <div className="col-lg-4">
                    <div className ="jumbotron" >
                        <div>
                        <h3>로그인 화면</h3>
                             &nbsp;
                             <div className ="form-group">
                                 <input 
                                    type ="text" 
                                    id = "input_id"
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
                                    id = "input_pw"
                                    className="form-control" 
                                    placeholder="비밀번호" 
                                    value = {this.state.password} 
                                    onChange = {this.handlePassWordChange}
                                    ref = { (ref) =>{ this.pwInput = ref } } 
                                />
                            </div>
                            &nbsp;
                            <button className="btn btn-primary form-control" onClick = {this.handleSubmit}>로그인</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;