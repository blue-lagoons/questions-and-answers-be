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
      return results.rows;
    })
    .catch(error => console.log(error));
};

const getAnswers = (req, res) => {
  let question_id = [req.params.question_id];
  let returnObj = {
    question: question_id,
    page: 0, // Selects the page of results to return. Default 1.
    count: 5, // Specifies how many results per page to return. Default 5.
    results: [],
  };

    return pool.query(`SELECT a.*, p.photo_id, p.url FROM answers a LEFT JOIN answer_photos p ON a.answer_id=p.p_answer_id WHERE a.a_question_id = $1 AND a.a_reported = 0`, question_id)
    .then(results => {
      let answers = results.rows

      let photoArr = [];
      for (let i = 0; i < answers.length; i++) {
        

        if (answers[i].url) {
          photoArr
        }
        
  
        let answerObj = {
          answer_id: answers.answer_id,
          body: answers.a_body,
          date: answers.a_date,
          answerer_name: answers.answerer_name,
          helpfulness: answers.a_helpful,
        }
        returnObj.results.push(answerObj);
      } 
        
        
        console.log(answerObj);
      
      return answers;
    })
    .catch(error => console.log(error));
};

module.exports = {
    pool,
    getQuestions,
    getAnswers
};