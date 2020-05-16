import React from 'react';
import { Route } from 'react-router-dom';
import Container from './Container';
import Write from './Write';
import Login from './Login';
import Join from './Join';
import View from './View';
import Update from './update';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        {
          SEQ: null,
          writer: null,
          subject: null,
          content: null,
          date: null,
          bbsAvailable: null
        }]
    }
  }
  componentDidMount() {
    var xhr = new XMLHttpRequest();
      xhr.open('get', 'http://localhost:3000/api/board');

      fetch('/api/board')
        .then(res=>res.json())
        .then(data=>this.setState({board:data.row}));
  }
  render () {
    const {board} = this.state; 
    return (   
      <div>
        &nbsp;
        &nbsp;
        <Route exact path = "/" component = {Container} />
        <Route path = "/login" component = {Login} />
        <Route path = "/join" component = {Join} />
        <Route path = "/write" component = {Write} /> 
        {
          board.map((contact, index) => {
            return (  
              <Route key = { index } path = {"/bbsID" + (index+1) } component = {View} />
            )
          })
        }
        {
          board.map((contact, index) => {
            return (
              <Route key = { index } path = {"/upd_bbsID" + (index+1) } component = {Update} />
            )
          })
        }  
        &nbsp;
        &nbsp;
      </div>  
    )
  }
}

export default Menu;
