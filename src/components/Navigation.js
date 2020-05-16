import React from 'react';
import '../css/bootstrap.css';
import { Link } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.logout = this.logout.bind(this);
  };

  logout() {
    window.sessionStorage.clear();
  }
  
  componentDidMount() {
    this.setState({ username: window.sessionStorage.getItem('id') });
  }
  render () {
    return (
      <nav className ="navbar navbar-default">
        <div className ="navbar-header">
          <h1 className = "navbar-brand">리액트 게시판</h1>
        </div>
        <div>
          {
          this.state.username
            ?
            <div>
              { this.state.username }님 환영합니다.
              &nbsp;
              &nbsp;
              { <a href = "/">Home</a> }
              &nbsp;
              &nbsp;
              { <a href = "/" onClick = { this.logout }>로그아웃</a> }
            </div>
            :
            <div>
              &nbsp;
              &nbsp;
              { <a href = "/">Home</a> }
              &nbsp;
              &nbsp;
              { <Link to="/login">로그인</Link> }
              &nbsp;/&nbsp;
              { <Link to="/join">회원가입</Link> }
            </div>
          }
        </div>
      </nav>
    );
  }
}

export default Navigation;