const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;
const bodyParser = require('body-parser');

app.locals.pretty = true;
app.set('views', './views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', { topics: files }); // new file을 호출
    });
});
app.get(['/topic', '/topic/:id'], (req, res) => {
    fs.readdir('data', (err, files) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        const id = req.params.id;
        if (id) {
            fs.readFile('data/' + id, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', { topics: files, title: id, desc: data });
            });
        } else {
            res.render('view', { topics: files, title: 'Welcome', desc: 'Home sweet home' });
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

app.post('/topic', (req, res) => { //topic으로 전송한 데이터 캐치
    const title = req.body.title;
    const desc = req.body.desc;
    fs.writeFile('data/' + title, desc, (err) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        }

        res.redirect('/topic/' + title);
    });
});


app.listen(PORT, () => {
    console.log(`connected, ${PORT} port`);
});
