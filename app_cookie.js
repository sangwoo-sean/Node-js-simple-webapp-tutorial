const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('thisIsMyKey'));

app.get('/count', (req, res) => {
    let count;
    if (req.signedCookies.count) {
        count = parseInt(req.cookies.count);
    } else {
        count = 0;
    }
    count += 1;
    res.cookie('count', count, { signed: true }); // 웹에 보내주는 쿠키설정값
    res.send('count: ' + count);
});

const products = {
    1: { title: 'The history of web 1' },
    2: { title: 'The next web' },
    3: { title: 'The Node js' },
    4: { title: 'Life of Pie' }
};

app.get('/products', (req, res) => {
    let output = "";
    for (let name in products) {
        output += `
        <li>
            <a href="/cart/${name}">${products[name].title}</a>
        </li>`
    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">cart</a>`);
});

app.get('/cart/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let cart;
    if (req.signedCookies.cart) {
        cart = req.signedCookies.cart;
    } else {
        cart = {};
    }
    if (!cart[id]) {
        cart[id] = 0;
    }
    cart[id] += 1;
    res.cookie('cart', cart, { signed: true });
    res.redirect('/cart');
});

app.get('/cart', (req, res) => {
    const cart = req.signedCookies.cart;
    let output = '';
    if (!cart) {
        res.send("Empty!");
    } else {
        for (let id in cart) {
            output += `<li>${products[id].title} (${cart[id]})</li>`;
        }
    }
    res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href="/products">Product List</a>
    `);
});



app.listen(3003, () => {
    console.log("connected 3003 port");
});