import React from 'react';
import { Route } from 'react-router-dom';
import Container from './Container';
import Write from './Write';
import Login from './Login';
import Join from './Join';
import View from './View';

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
    fetch('/api')
        .then(res=>res.json())
        .then(data=>this.setState({board:data.board}));
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
        &nbsp;
        &nbsp;
      </div>  
    )
  }
}

export default Menu;
