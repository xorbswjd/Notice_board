import React from 'react';
import '../css/bootstrap.css';
import './login.css';

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            password: '',
            passwordcheck: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handlePassWordChange = this.handlePassWordChange.bind(this);
        this.handlePassWordCheckChange = this.handlePassWordCheckChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addUser = this.addUser.bind(this);
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
        var data = {'name' : name, 'id' : id, 'password' : password};
        data = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/api/user_join');
        xhr.setRequestHeader('Content-Type', "application/json");
        xhr.send(data);

        xhr.addEventListener('load', function() {
            var result = JSON.parse(xhr.responseText);
            if(result.resule === "id_no") {
                alert('아이디가 존재합니다');  
            } else if(result.resule === "ok") {
                alert('사용자 생성 완료');
                document.location.href = '/';
            }
        });
    }
    
    handleSubmit() {
        if(!this.state.name) {
            alert('이름을 입력해주세요');
            this.nameInput.focus();
        } else if(!this.state.id) {
            alert('아이디를 입력해주세요');
            this.idInput.focus();
        } else if(!this.state.password) {
            alert('비밀번호를 입력해주세요');
            this.passwordInput.focus();
        } else if(!this.state.passwordcheck) {
            alert('비밀번호확인을 입력해주세요');
            this.passwordcheckInput.focus();
        } else {
            if(this.state.password === this.state.passwordcheck) {
                this.addUser(this.state.name, this.state.id, this.state.password);
            } else {
                alert('비밀번호가 같지 않습니다');
            }
        }
    }

    render () {
        return (
            <div className = "container">
                <div className = "col-lg-4">
                    <div className ="jumbotron">
                        <div>
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
                            <button className = "btn btn-primary form-control" onClick = {this.handleSubmit}>회원가입</button>
                        </div>
                    </div> 
                </div> 
            </div>
        )
    }
}

export default Join;
