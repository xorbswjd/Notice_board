import React from 'react';
import './comment.css';
import '../css/bootstrap.css';

class CommentInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addcom: '0',
            coId: '',
            coContent: '',
            Cocomment: [
                {
                    SEQ: null,
                    id: null,
                    content: null,
                    commentSEQ: null
                }
            ]
        }
        this.handleCocommentIDChange = this.handleCocommentIDChange.bind(this);
        this.handleCocommentContentChange = this.handleCocommentContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addcontact = this.addcontact.bind(this);
    }

    handleCocommentIDChange(event) {
        this.setState({coId: event.target.value});
    }

    handleCocommentContentChange(event) {
        this.setState({coContent: event.target.value});
    }

    handleSubmit() {
        const { Cocomment } = this.state;
        var num = window.location.href.substring(27, window.location.href.length);
        if(this.state.coContent){
            var data = {'seq' : (Cocomment.length + 1), 'id' : this.state.coId, 'content' : this.state.coContent, 'commentSEQ' : this.state.addcom};
            data = JSON.stringify(data);
            console.log(data);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:3000/api/add_cocomment');
            xhr.setRequestHeader('Content-Type', "application/json");
            xhr.send(data);

            xhr.addEventListener('load', function() {
                var result = JSON.parse(xhr.responseText);
                if(result.resule === "ok") {
                    alert('답글 입력');
                    document.location.href = '/bbsID' + num;  
                } else {
                    alert('실패');  
                }
            });
        } else {
            alert('내용 입력');
        }
    }

    addcontact() {
        if(this.state.addcom !== this.props.SEQ) {
            this.setState({ addcom: this.props.SEQ })
        } else {
            this.setState({ addcom: '0' })
        }
    }

    componentDidMount() {
        this.setState({ coId: window.sessionStorage.getItem('id') });
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:3000/api/cocomment');

       fetch('/api/cocomment')
            .then(res=>res.json())
            .then(data=>this.setState({Cocomment : data.row}));
      }

    render() {
        var num = window.location.href.substring(27, window.location.href.length);
        const { Cocomment } = this.state;
        if(this.props.bbsSEQ === num) {
            return(
                <div className = 'commentDiv'> 
                    <h4 className = 'commentId'>
                        ID : { this.props.id }
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className='CocommentBtn' onClick = { this.addcontact } seq = { this.props.SEQ }>답글</button>
                    </h4> 
                    <h5 className = 'commentInfo'>{ this.props.contact }</h5>
                    <div>
                        {
                            this.state.addcom === this.props.SEQ
                            ?
                            <div>
                                {
                                Cocomment.map((contact, index) => {
                                    if(this.state.addcom === contact.commentSEQ) {
                                        return(
                                            <CocommentInfo 
                                                id = { contact.id }
                                                contact = { contact.content }
                                                commentSEQ = { contact.commentSEQ }
                                                SEQ = { contact.SEQ }
                                                key={ index }
                                            />
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                                }
                                <div className = 'CocoInput'>
                                { this.state.coId } :
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <input 
                                        type ="text" 
                                        className="cocontent" 
                                        placeholder=" 내용" 
                                        value = { this.state.Cocomment.content }  
                                        onChange = { this.handleCocommentContentChange } 
                                    />
                                    &nbsp;
                                    <button onClick = { this.handleSubmit }>등록</button>
                                </div>
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

class CocommentInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div className = 'CocommentDiv'>
                <h4 className = 'CocommentId'>
                    -> ID : { this.props.id }
                </h4> 
                <p className = 'CocommentInfo'>{ this.props.contact }</p>
                {
                    // this.props.id === 'blue' 
                    // ?
                    // <button>삭제</button>
                    // :
                    // null
                }
                    
            </div>
        );
    }
}


export default CommentInfo;