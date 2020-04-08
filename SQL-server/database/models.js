const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qa',
  password: 'postgres',
});


const getQuestions = (req, res) => {
  let product_id = [req.params.product_id];
  let returnObj = {
    product_id: req.params.product_id,
    results: [],
  };

  return pool.query('SELECT * FROM questions WHERE product_id = $1 AND reported = 0', product_id)
    .then(results => {
      return results.rows;
    })
    .catch(error => console.log(error));
};

const getAnswers = (req, res) => {
  
  let returnObj = {
    question: req.params.question_id,
    page: req.query.page || 0,
    count: req.query.count || 5,
    results: [],
  };
  let count = Number(returnObj.count);
  let offset = Number(returnObj.page * count);
  

    return pool.query(`SELECT a.*, p.photo_id, p.url FROM answers a LEFT JOIN answer_photos p ON a.answer_id=p.p_answer_id WHERE a.a_question_id = $1 AND a.a_reported = 0`, [req.params.question_id])
    .then(results => {
      let answers = results.rows

      let photoArr = [];
      for (let i = 0; i < answers.length; i++) {
        
        if (answers[i].url) {
          let photoObj ={
            id: answers[i].photo_id,
            url: answers[i].url
          };

          photoArr.push(photoObj);
          
          if (answers[i].answer_id === answers[i+1].answer_id) {
            continue;
          }
        }
  
        let answerObj = {
          answer_id: answers[i].answer_id,
          body: answers[i].a_body,
          date: answers[i].a_date,
          answerer_name: answers[i].answerer_name,
          helpfulness: answers[i].a_helpful,
          photos: photoArr,
        };

        returnObj.results.push(answerObj);
        
        photoArr = [];
      } 

      returnObj.results = returnObj.results.slice(offset, count+offset);
      return returnObj;
    })
    .catch(error => console.log(error));
};

module.exports = {
    pool,
    getQuestions,
    getAnswers
};