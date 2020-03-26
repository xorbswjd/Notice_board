import React from 'react';
import { createBrowserHistory } from 'history';
//import { Route } from 'react-router-dom';
import '../css/bootstrap.css';
import './container.css';
import { Link } from 'react-router-dom';
//import View from './View';
  
const browserHistory = createBrowserHistory();

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
        this.writeCilek = this.writeCilek.bind(this);
    }

    writeCilek() {
        if(window.sessionStorage.getItem('id')){
            browserHistory.push('/');
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
                                SEQ={contact.SEQ}
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
                 {/*
                   function() {
                      if(pageNumber != 1){
                      <button className="btn btn-success btn-arrow-left">이전</button>
                        } if(board.length > 10) {
                            <button className="btn btn-success btn-arrow-left">다음</button>
                        }
                      }
                   }*/
                 }
                 {
                    window.sessionStorage.getItem('id')
                    ?
                    <Link to = '/write' className = "btn btn-primary pull-right" >글쓰기</Link>
                    :
                    <p></p>
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