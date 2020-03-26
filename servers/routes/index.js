const express = require('express');
const router =express.Router();

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'board'
});

connection.connect();

connection.query('SELECT * FROM tb_board', function (error, results) {
    if (error) {
        console.log(error);
    }
    router.get('/api', (req, res)=>res.json({board: results}));
});

connection.query('SELECT * from user', function (error, results) {
    if (error) {
        console.log(error);
    }
    router.get('/api/user', (req, res)=>res.json({user: results}));
});

connection.end();

module.exports = router;