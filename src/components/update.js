import React from 'react';
import '../css/bootstrap.css';

class Update  extends React.Component {

    constructor(props) {
        super(props);
        this.state = {  
            bbsTitle: '',
            bbsContent: '',
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
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.bbsUpdate = this.bbsUpdate.bind(this);
    }

    handleTitleChange(event) {
        this.setState({bbsTitle: event.target.value});
    }

    handleContentChange(event) {
        this.setState({bbsContent: event.target.value});
    }

    bbsUpdate() {
        var seq = window.location.href.substring(31, window.location.href.length);
        var title = this.state.bbsTitle;
        var content = this.state.bbsContent;
        if(!title) {
            title = this.state.board[(seq-1)].subject;
        }
        if(!content) {
            content = this.state.board[(seq-1)].content;
        }
        var data = {'seq' : seq, 'title' : title, 'content' : content};
        data = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/api/upd_content');
        xhr.setRequestHeader('Content-Type', "application/json");
        xhr.send(data);

        xhr.addEventListener('load', function() {
            var result = JSON.parse(xhr.responseText);
            if(result.resule === "ok") {
                alert('글이 수정되었습니다.');
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

    render () {  
        var num = window.location.href.substring(31, window.location.href.length) - 1;
        const {board} = this.state;
        if(board[num]){
            return (
                <div className = "container">
                    <div>
                        <table className = "table table-striped upd_table">
                            <thead>
                                    <tr>
                                        <th colSpan="2" className = "upd_th">게시판 글 수정</th>
                                    </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="text" className="form-control" placeholder={ board[num].subject }  name="bbsTitle" maxLength="50" onChange={this.handleTitleChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <textarea className="form-control upd_textarea" placeholder={ board[num].content }  name="bbsContent" maxLength="2048" onChange={this.handleContentChange}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-primary pull-right" onClick={this.bbsUpdate}>글수정</button>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Update;