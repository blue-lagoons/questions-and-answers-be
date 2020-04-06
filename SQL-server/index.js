const express = require('express');
const bodyParser = require('body-parser');
const db = require('../sql-db/queries'); 

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//get questions for product
app.get('/qa/:product_id', (req, res) => {
    console.log('hi');
    console.log(req.params.product_id);
    //call on specific query to grabbing all the questions relating to the product_ID
});

//get answers for question
app.get('/qa/:question_id/answers', (req, res) => {
    console.log('hi');
    console.log(req.params.question_id);
    //call on specific query to grabbing all the answers relating to the product_ID
});

//add a question
app.post('/qa/:product_id', (req, res) => {
    console.log('hi');
    console.log(req.params.product_id);
});

//add an answer
app.post('/qa/:question_id/answers', (req, res) => {
    console.log('hi');
    console.log(req.params.question_id);
});

//mark question helpful
app.put('/qa/question/:question_id/helpful', (req, res) => {
    console.log('hi');
    console.log(req.params.question_id);
});

//report question
app.put('/qa/question/:question_id/report', (req, res) => {
    console.log('hi');
    console.log(req.params.question_id);
});

//mark answer helpful
app.put('/qa/answer/:answer_id/helpful', (req, res) => {
    console.log('hi');
    console.log(req.params.answer_id);
});

//report answer
app.put('/qa/answer/:answer_id/report', (req, res) => {
    console.log('hi');
    console.log(req.params.answer_id);
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
