const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'opentutorials'
});

conn.connect(); // 연결시작

// const sql = 'SELECT * FROM topic';

//READ
// conn.query(sql, (err, rows, fields) => {
//     if (err) { console.log(err) }
//     else {
//         for (let i = 0; i < rows.length; i++) {
//             console.log(rows[i].author);
//         }
//     }
// });

//CREATE
// const sql = 'INSERT INTO topic (title, description, author, created)\
// VALUES(?, ?, ?, ?)';
// const params = ['Supervisor', 'Watcher', 'graphittie', '20210305'];

// conn.query(sql, params, (err, rows, fields) => {
//     if (err) { console.log(err) }
//     else {
//         console.log(rows);
//     }
// });

//UPDATE
// const sql = 'UPDATE topic SET title=?, author=? WHERE id=?';
// const params = ['Oracle', 'sangwoo3', 10];

// conn.query(sql, params, (err, rows, fields) => {
//     if (err) { console.log(err) }
//     else {
//         console.log(rows);
//     }
// });

//DELETE
const sql = 'DELETE FROM topic WHERE id=?';
const params = [3];

conn.query(sql, params, (err, rows, fields) => {
    if (err) { console.log(err) }
    else {
        console.log(rows);
    }
});


conn.end(); // 연결 종료