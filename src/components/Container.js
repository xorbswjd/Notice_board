import React from 'react';
import '../css/bootstrap.css';
import './container.css';
import { Link } from 'react-router-dom';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      board: [
      {
        SEQ: null,
        writer: null,
        subject: null,
        content: null,
        date: null,
        bbsAvailable: null
      }]
    };
  }

  componentDidMount() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:3000/api/board/container');

    fetch('/api/board/container')
      .then(res=>res.json())
      .then(data=>this.setState({board:data.row}));
  }

  render () {
    const {board} = this.state; 
    return (
      <div className ="container">
        <div className ="row">
        <table className = "table table-striped, container-table">
          <thead>
            <tr>
              <th className = "thead-td">번호</th>
              <th className = "thead-td">제목</th>
              <th className = "thead-td">작성자</th>
              <th className = "thead-td">작성일</th>
            </tr>
          </thead>
          <tbody>      
          {
          board.map((contact, index) => {
            return (
              <ContainerInfo 
              SEQ={contact.seq}
              subject={contact.subject}
              writer={contact.writer}
              date={contact.date}
              key={index}
              />    
            );
          }) 
          }
          </tbody>
        </table>
        {
            this.state.pageNumber !== 1
              ?
              <button className="btn btn-success btn-arrow-left">이전</button> 
              :
              null
        }
        {
            this.state.board.length > 10
              ?
              <button className="btn btn-success btn-arrow-left">다음</button>
              :
              null
        }
        {
          window.sessionStorage.getItem('id')
          ?
          <Link to = '/write' className = "btn btn-primary pull-right" >글쓰기</Link>
          :
          null
        }
        </div>
      </div>
    );
  }
}

class ContainerInfo extends React.Component {
  render() {
    return(
      <tr>
        <th>{this.props.SEQ}</th>
        <th><Link to = {'/bbsID'+(String)(this.props.SEQ)}>{this.props.subject}</Link></th>
        <th>{this.props.writer}</th>
        <th>{(String)(this.props.date).substring(0,10)}</th>
      </tr>
    );
  }
}

export default Container;