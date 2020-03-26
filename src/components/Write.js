import React from 'react';
import { createBrowserHistory } from 'history';
import '../css/bootstrap.css';
import './write.css'

var io = require('socket.io-client');

const browserHistory = createBrowserHistory();
const socketClient = io("http://localhost:3003");

class Write extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
		id: '',
		bbsTitle: '',
		bbsContent: ''
	}
    this.handleBbsTitleChange = this.handleBbsTitleChange.bind(this);
    this.handleBbsContentChange = this.handleBbsContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleBbsTitleChange(event) {
	this.setState({bbsTitle: event.target.value});
}

handleBbsContentChange(event) {
	this.setState({ bbsContent: event.target.value });
}

addDate() {
	socketClient.on("connect", () => { 
		console.log("connection server"); 
	});
	socketClient.emit("first Request", { data : 'addData' });
	socketClient.emit("addData", { data: "1" }); 
	socketClient.on("first Respond", req => { 
		if(req.data === "close") {
			socketClient.close();
		}
	 });
}

handleSubmit() {
	if(this.state.bbsTitle){
		if(this.state.bbsContent){
			console.log(this.state)
			//this.addDate();
		} else {
			console.log('내용 입력')
			this.contentInput.focus();
		}
	} else {
		console.log('제목 입력')
		this.titleInput.focus();
	}
}

componentDidMount() {
	this.setState({ id: window.sessionStorage.getItem('id') });
  }
  
  render () {
    return (
        <div className = "container">
		  <form onSubmit={this.handleSubmit}>
            <table className = "table table-striped">
                <thead>
	 				<tr>
	 					<th className = "tablefrom" colSpan = '2'>게시판 글쓰기 양식</th>
	 				</tr>
	 			</thead> 
	 			<tbody>
	 				<tr>
						 <td>
							 <input 
								 type="text" 
								 className="form-control" 
								 placeholder="글 제목" 
								 value = {this.state.bbsTitle} 
								 onChange = {this.handleBbsTitleChange}
								 ref = { (ref) =>{ this.titleInput = ref } }
								 maxLength="50"
							/>
						</td>
	 				</tr>
	 				<tr>
	 					<td>
							 <textarea 
								 className = "form-control, form-height" 
								 placeholder="글 내용"  
								 value = {this.state.bbsContent} 
								 onChange = {this.handleBbsContentChange}
								 ref = { (ref) =>{ this.contentInput = ref } }
								 maxLength="2000"
							/>
						</td>
	 				</tr>
	 			</tbody>
            </table>
            <input type="submit" className="btn btn-primary pull-right" value="글쓰기" />
		  </form>
		</div>
    );
  }
}

export default Write;