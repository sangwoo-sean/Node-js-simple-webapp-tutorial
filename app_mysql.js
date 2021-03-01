const express = require('express');
const app = express();
const fs = require('fs');
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'opentutorials'
});

conn.connect(); // 데이터베이스 연결시작
const PORT = 3000;
const bodyParser = require('body-parser');

app.locals.pretty = true;
app.set('views', './views_mysql');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/topic/add', (req, res) => {
    const inner_sql = 'SELECT id, title FROM topic';
    conn.query(inner_sql, (err, topics, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('add', { topics });
        }
    });
});

app.post('/topic/add', (req, res) => { //topic으로 전송한 데이터 캐치
    const title = req.body.title;
    const desc = req.body.desc;
    const author = req.body.author;
    const time = new Date();
    // fs.writeFile('data/' + title, desc, (err) => {
    const sql = 'INSERT INTO topic (title, description, author, created) VALUES(?,?,?,?)';
    conn.query(sql, [title, desc, author, time], (err, result, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic/' + result.insertId);
        }
    });
});


app.get(['/topic', '/topic/:id'], (req, res) => {
    const sql = 'SELECT id, title, description FROM topic';
    conn.query(sql, (err, topics, fields) => {
        const id = req.params.id;
        if (id) {
            const inner_sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(inner_sql, [id], (err, topic, fields) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('view', { topics, topic: topic[0] })
                }
            });
        } else {
            res.render('view', { topics });
        }
    });

});


// app.get('/topic/:id', (req, res) => {
//     const id = req.params.id;

//     fs.readdir('data', (err, files) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         fs.readFile('data/' + id, 'utf8', (err, data) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Internal Server Error');
//             }
//             res.render('view', { topics: files, title: id, desc: data });
//         });
//     });

// });



app.listen(PORT, () => {
    console.log(`connected, ${PORT} port`);
});
