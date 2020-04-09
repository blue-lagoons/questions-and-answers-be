const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/models'); 

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/qa/:product_id', (req, res) => {
    return db.getQuestions(req)
      .then(results => res.send(results))
      .catch(error => console.log(error));
});

app.get('/qa/:question_id/answers', (req, res) => {
    return db.getAnswers(req)
      .then(results => res.send(results))
      .catch(error => console.log(error));
});

app.post('/qa/:product_id', (req, res) => {
    return db.addQuestion(req)
      .then(results => res.sendStatus(201))
      .catch(error => console.log(error));
});

app.post('/qa/:question_id/answers', (req, res) => {
    return db.addAnswer(req)
      .then(results => res.sendStatus(201))
      .catch(error => console.log(error));
});

app.put('/qa/question/:question_id/helpful', (req, res) => {
    return db.markQuesitonHelpful(req)
      .then(results => res.sendStatus(204))
      .catch(error => console.log(error));
});

app.put('/qa/question/:question_id/report', (req, res) => {
    return db.reportQuestion(req)
      .then(results => res.sendStatus(204))
      .catch(error => console.log(error));;
});

app.put('/qa/answer/:answer_id/helpful', (req, res) => {
    return db.markAnswerHelpful(req)
      .then(results => res.sendStatus(204))
      .catch(error => console.log(error));;
});

app.put('/qa/answer/:answer_id/report', (req, res) => {
    return db.reportAnswer(req)
      .then(results => res.sendStatus(204))
      .catch(error => console.log(error));;
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
