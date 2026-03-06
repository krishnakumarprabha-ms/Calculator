const http = require('http');
const path = require('path');
const fileURLToPath = require('url');
const express = require('express');
const {separator, calculate} = require('./public/utils/calculation');

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/views'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render("index", {title: "Calculator"});
});

app.get('/about', (req, res) => {
    res.render("about", {title: "About"});
});

app.get('/contact', (req, res) => {
    res.render("contact", {title: "Contact Us"});
});

app.get('/logIn', (req, res) => {
    res.render("login", {title: "Log In"});
})

app.get('/signUp', (req, res) => {
    res.render("signup", {title: "Sign Up"});
})

app.post('/api/calculate', (req, res) => {
    const { expression } = req.body;
    if (expression === "") {
        return res.status(400).json({error: "Expression is empty"});
    }
    const elements = separator(expression);
    const result = calculate(elements);
    res.json({result});
})

const port = 3200;

const server = http.createServer(app);

server.listen(port, (err) => {
    if (err) {
        console.log("Error in starting the server", err);
    }
    console.log("Server running in port ", port);
})