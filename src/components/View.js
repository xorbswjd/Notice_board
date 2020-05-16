import React from 'react';
import '../css/bootstrap.css';
import './view.css';

class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          board: [{
            seq: null,
            writer: null,
            subject: null,
            content: null,
            date: null,
            bbsAvailable: null
          }]
        };
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    update() {
        var num = window.location.href.substring(27, window.location.href.length);
        document.location.href = '/upd_bbsID' + num;

    }

    delete() {
        var num = window.location.href.substring(27, window.location.href.length);
        var data = {'seq' : num};
        data = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/api/del_content');
        xhr.setRequestHeader('Content-Type', "application/json");
        xhr.send(data);

        xhr.addEventListener('load', function() {
            var result = JSON.parse(xhr.responseText);
            if(result.resule === "ok") {
                alert('삭제되었습니다.');
                document.location.href = '/';
            } else {
                alert('실패');
            }
        });
    }

    componentDidMount() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:3000/api/board');

       fetch('/api/board')
            .then(res=>res.json())
            .then(data=>this.setState({board:data.row}));
    }


    render() {
        const {board} = this.state; 
        var num = window.location.href.substring(27, window.location.href.length)-1;
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
                            window.sessionStorage.getItem('id') === board[num].writer
                            ?
                            <div>
                                <button className="btn btn-primary" onClick={this.update}>수정</button>
                                &nbsp;
                                <button className="btn btn-primary" onClick={this.delete}>삭제</button>
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