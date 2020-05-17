import React from 'react';
import './comment.css';
import CommentInfo from './CommentInfo';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coId: '',
            coContent: '',
            comment: [{
                SEQ: null,
                id: null,
                content: null,
                bbsSEQ: null,
                com_Available: null   
            }]
        };

        this.handleCommentIDChange = this.handleCommentIDChange.bind(this);
        this.handleCommentContentChange = this.handleCommentContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCommentIDChange(event) {
        this.setState({coId: event.target.value});
    }

    handleCommentContentChange(event) {
        this.setState({coContent: event.target.value});
    }

    handleSubmit() {
        //DB 추가
        const { comment } = this.state;
        var num = window.location.href.substring(27, window.location.href.length);
        if(this.state.coContent){
            var data = {'seq' : (comment.length + 1), 'id' : this.state.coId, 'content' : this.state.coContent, 'bbsSEQ' : num};
	        data = JSON.stringify(data);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:3000/api/add_comment');
            xhr.setRequestHeader('Content-Type', "application/json");
            xhr.send(data);

            xhr.addEventListener('load', function() {
                var result = JSON.parse(xhr.responseText);
                if(result.resule === "ok") {
                    alert('댓글 입력');
                    document.location.href = '/bbsID' + num;  
                } else {
                    alert('실패');  
                }
            });
        } else {
            alert('내용 입력');
        }
    }

    componentDidMount() {
        this.setState({ coId: window.sessionStorage.getItem('id') });
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:3000/api/comment');

       fetch('/api/comment')
            .then(res=>res.json())
            .then(data=>this.setState({comment : data.row}));
      }

    render() {
        const { comment } = this.state;
        if(comment[0].seq) {
            return(
                <div className = "Cocontainer">
                    {
                        comment
                        ?
                        <div>
                            {
                            comment.map((contact, index) => {
                                return(
                                    <CommentInfo
                                        id = { contact.id }
                                        contact = { contact.content }
                                        bbsSEQ = { contact.bbsSEQ }
                                        SEQ = { contact.seq }
                                        key={ index }
                                    />
                                );
                            })
                            }
                        </div>
                        :
                        null
                    }
                    {
                        window.sessionStorage.getItem('id')
                            ?
                            <div className = 'coInput'>
                            { this.state.coId } :
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <input
                                type ="text" 
                                className="cocontent" 
                                placeholder=" 내용" 
                                value = { this.state.comment.content }  
                                onChange = { this.handleCommentContentChange } 
                            />
                            &nbsp;
                            <button onClick = { this.handleSubmit }>등록</button>
                        </div>
                        :
                        null
                    }
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Comment;