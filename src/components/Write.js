import React from 'react';
import '../css/bootstrap.css';
import './write.css'

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
	this.addDate = this.addDate.bind(this);
  }

handleBbsTitleChange(event) {
	this.setState({bbsTitle: event.target.value});
}

handleBbsContentChange(event) {
	this.setState({ bbsContent: event.target.value });
}

addDate() {
	var data = {'id' : this.state.id, 'bbsTitle' : this.state.bbsTitle, 'bbsContent' : this.state.bbsContent};
	data = JSON.stringify(data);
	var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/add_content');
    xhr.setRequestHeader('Content-Type', "application/json");
	xhr.send(data);
	
	xhr.addEventListener('load', function() {
		var result = JSON.parse(xhr.responseText);
		if(result.resule === "ok") {
			document.location.href = '/'; 
		} else {
			alert('실패');  
		}
	});
}

handleSubmit() {
	if(this.state.bbsTitle){
		if(this.state.bbsContent){
			this.addDate();
		} else {
			alert('내용을 입력하세요');
			this.contentInput.focus();
		}
	} else {
		alert('제목을 입력하세요');
		this.titleInput.focus();
	}
}

componentDidMount() {
	this.setState({ id: window.sessionStorage.getItem('id') });
  }
  
  render () {
    return (
        <div className = "container">
		  <div>
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
			<button className="btn btn-primary pull-right" onClick={this.handleSubmit}>글쓰기</button>
		  </div>
		</div>
    );
  }
}

export default Write;