const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qa',
  password: 'postgres',
});


const getQuestions = (req, res) => {
  let product_id = [req.params.product_id];
    return pool.query('SELECT * FROM questions WHERE product_id = $1 AND reported = 0', product_id)
      .then(results => {
        res.send(results.rows)
      })
      .catch(error => console.log(error));
};

const getAnswers = (req, res) => {
  let question_id = [req.params.question_id];
    return pool.query('SELECT * FROM answers WHERE question_id = $1 AND reported = 0', question_id)
      .then(results => {
        res.send(results.rows)
      })
      .catch(error => console.log(error));
};

module.exports = {
    pool,
    getQuestions,
    getAnswers
};