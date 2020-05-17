const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port =process.env.PORT || 3002;
const route = require('./routes/index');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'board'
});

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', route);
//app.use('/api/user', route);

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})

app.get('/api/board', function(req,res) {
    connection.query('select * from board', function(err,rows) {
        if(rows){
            var responseData = {'resule' : 'ok', 'row' : rows}
        } else {
            var responseData = {'resule' : 'no'}
        }
        res.json(responseData)
    });
});

app.get('/api/board/container', function(req,res) {
    connection.query('select * from board where bbsAvailable = "1"', function(err,rows) {
        if(rows){
            var responseData = {'resule' : 'ok', 'row' : rows}
        } else {
            var responseData = {'resule' : 'no'}
        }
        res.json(responseData)
    });
});

app.post('/api/user_login', (req, res)=> {
    var id = req.body.id;
    var password = req.body.password;
    connection.query('select name, password from user where id = "' + id + '"', function(err, rows) { 
        if(rows[0]) {
            if(password === rows[0].password) {
                var responseData = {'resule' : 'ok', 'name' : rows[0].name};
            } else {
                var responseData = {'resule' : 'password_no'}
            }
        } else {
            var responseData = {'resule' : 'no'}
        }      
        res.json(responseData)
    });
});

app.post('/api/user_join', function(req, res) {
    var name = req.body.name;
    var id = req.body.id;
    var password = req.body.password;
    connection.query('select name from user where id = "' + id + '"', function(err, rows) { 
        if(rows[0]) {
            var responseData = {'resule' : 'id_no'};
            res.json(responseData)
        } else {
            connection.query('insert into user (id, name, password) values ("' + id + '","' + name + '","' + password + '")', function(err, rows) {
                if(!err) {
                    var responseData = {'resule' : 'ok'};
                } else {
                    var responseData = {'resule' : 'no'};
                }
                res.json(responseData)
            });
        }
    });
});

app.post('/api/add_content', function(req, res) {
    var id = req.body.id;
    var subject = req.body.bbsTitle;
    var content = req.body.bbsContent;
    connection.query('select count(*) as count from board', function(err, rows) { 
        if(rows) {
            var seq = (rows[0].count + 1);
            connection.query('select now() as date', function(err, rows) {
                if(rows) {
                    var date = rows[0].date;
                    date = JSON.stringify(date)
                    date = date.substring(1,11);
                    connection.query('insert into board values ("' + seq + '","' + id + '","' + subject + '","' + content + '","' + date + '", "1")', function(err, rows) {
                        if(!err) {
                            var responseData = {'resule' : 'ok'};
                        } else {
                            var responseData = {'resule' : 'no'};
                        }
                        res.json(responseData)
                    });
                }
            });
        }
        
    });
});

app.post('/api/upd_content', function(req, res) {
    var seq = req.body.seq;
    var title = req.body.title;
    var content = req.body.content;

    connection.query('UPDATE board SET subject = "' + title + '", content = "' + content + '" where seq = "'+ seq + '"', function(err, rows) {
        if(!err) {
            var responseData = {'resule' : 'ok'};
        } else {
            var responseData = {'resule' : 'no'};
        }
        res.json(responseData)
    });
});


app.post('/api/del_content', function(req, res) {
    var seq = req.body.seq;

    connection.query('UPDATE board SET bbsAvailable = "0" where seq = "'+ seq + '"', function(err, rows) {
        if(!err) {
            var responseData = {'resule' : 'ok'};
        } else {
            var responseData = {'resule' : 'no'};
        }
        res.json(responseData)
    });
});

app.get('/api/comment', function(req,res) {
    connection.query('select * from comment', function(err,rows) {
        if(rows){
            var responseData = {'resule' : 'ok', 'row' : rows}
        } else {
            var responseData = {'resule' : 'no'}
        }
        res.json(responseData)
    });
});

app.get('/api/cocomment', function(req,res) {
    connection.query('select * from cocomment', function(err,rows) {
        if(rows){
            var responseData = {'resule' : 'ok', 'row' : rows}
        } else {
            var responseData = {'resule' : 'no'}
        }
        res.json(responseData)
    });
});

app.post('/api/add_comment', function(req,res) {
    var seq = req.body.seq;
    var id = req.body.id;
    var content = req.body.content;
    var bbsSEQ = req.body.bbsSEQ;
    connection.query('insert into comment values ("' + seq + '","' + id + '","' + content + '","' + bbsSEQ + '", "1")', function(err, rows) {
        if(!err) {
            var responseData = {'resule' : 'ok'};
        } else {
            var responseData = {'resule' : 'no'};
        }
        res.json(responseData)
    });
}); 

app.post('/api/add_cocomment', function(req,res) {
    var seq = req.body.seq;
    var id = req.body.id;
    var content = req.body.content;
    var commentSEQ = req.body.commentSEQ;
    connection.query('insert into cocomment values ("' + seq + '","' + id + '","' + content + '","' + commentSEQ + '", "1")', function(err, rows) {
        if(!err) {
            var responseData = {'resule' : 'ok'};
        } else {
            var responseData = {'resule' : 'no'};
        }
        res.json(responseData)
    });
}); 
