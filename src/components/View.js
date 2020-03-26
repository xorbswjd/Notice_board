import React from 'react';
import '../css/bootstrap.css';
import './view.css';

class View extends React.Component {
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
        };
    }

    componentDidMount() {
        fetch('/api')
            .then(res=>res.json())
            .then(data=>this.setState({board:data.board}));
    }

    render() {
        const {board} = this.state; 

        var num = window.location.hash.substring(7, window.location.hash.length)-1

        if(board[num]){
            var date = '' + board[num].date
            return(
                <div className = "container">
                    <div className = "row"> 
                        <table className = "table table-striped">
                            <thead>
                                <tr>
                                    <th className = "header" colSpan="3">게시판 글 보기</th>
                                </tr>
                            </thead> 
                             <tbody>
                                <tr>
                                    <td className = "title">글 제목</td>
                                    <td colSpan="2">
                                        {
                                            board
                                            ?
                                            board[num].subject
                                            :
                                            null
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>작성자</td>
                                    <td colSpan="2">
                                        {
                                            board
                                            ?
                                            board[num].writer
                                            :
                                            null
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>작성일자</td>
                                    <td colSpan="2">
                                        {
                                            board
                                            ?
                                            date.substring(0, 10)
                                            :
                                            null
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>내용</td>
                                    <td className = "content" colSpan="2">
                                        {
                                            board
                                            ?
                                            board[num].content
                                            :
                                            null
                                        }
                                </td>    
                                </tr>
                            </tbody>
                        </table>
                        <a href="/" className="btn btn-primary">목록</a>
                        &nbsp;       
                        {
                            window.sessionStorage.getItem('id') === board[window.location.hash[7]-1].writer
                            ?
                            <div>
                                <button className="btn btn-primary">수정</button>
                                &nbsp;
                                <button className="btn btn-primary">삭제</button>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
    

}

export default View;