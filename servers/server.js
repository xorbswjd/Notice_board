const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3002;
const route = require('./routes/index');
var io = require('socket.io');
var http = require('http');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'board'
});

app.use(cors());
app.use(bodyParser.json());
app.use('/', route);
app.use('/api/user', route);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})

const httpServer = http.createServer(app).listen(3003, () => { 
    console.log("포트 3003에 연결되었습니다."); 
}); 

const socketServer = io(httpServer); 
socketServer.on("connection", socket => { 
    console.log("connect client by Socket.io"); 
        socket.on("first Request", req => { 
        if(req.data === 'join') {
            socket.on("join", req => { 
                connection.connect();

                connection.query(`INSERT INTO user VALUES ('${req.id}', ${req.password}, '${req.name}')`, function (error, results) {
                });
                connection.end(); 
            });
        } else if(req.data === 'addData') {
            socket.on("addData", req => { 
                connection.connect();

                connection.query('select SEQ from tb_board order by SEQ DESC LIMIT 1', function(result){
                    console.log(result);
                });

                connection.end();
            });
        }
        socket.emit("first Respond", { data: "close" }); 
    });
});
