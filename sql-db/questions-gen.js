const faker = require('faker');
const fs = require('fs');
const { performance } = require('perf_hooks');

const t0 = performance.now();
let id = 3521635;
let product_id = 1000012;

for (var i = 3521635; i <= 10000000; i++) {
  let body = faker.lorem.sentence();
  let date = JSON.stringify(faker.date.between('2020-01-01', '2020-03-31'));
  date = date.substring(1, 11)
  let name = faker.internet.userName();
  let email = faker.internet.email();
  let reported = faker.random.arrayElement([0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);  //10% of questions reported
  let helpful = faker.random.number({min:0, max:33});

  fs.appendFileSync('csv-files/noSQL-generatedQs.csv',  
    `${id},${product_id},"${body}","${date}","${name}","${email}",${reported},${helpful}\n`
  );

  let moveToNextProduct = faker.random.number({min: 1, max:3});
  if (moveToNextProduct === 3) {
      ++product_id;
  };

  ++id;
};

const t1 = performance.now();
console.log('execution time (ms): ', t1-t0);
console.log('execution time (min): ', (t1-t0)/ (60000));