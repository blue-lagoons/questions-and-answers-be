import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from "k6/metrics";
export let errorRate = new Rate("errors");

export let options = {
    vus: 60,            // A number specifying the number of VUs to run concurrently
    duration: '5m',    // m for min
    // rps: 100,           // The maximum number of requests to make per second, in total across all VUs
    throw: true,         // throw errors on failed HTTP requests
    // discardResponseBodies: true, //discard repsponse bodies to lessen the amount of mem required
    thresholds: {http_req_duration: ["max<2000"]},
};

export default function() {
  
  for (let i = 0; i < 100; i++) {
      let randomQ = Math.floor(Math.random() * (10000001 - 1) + 1);
    
      let res = http.get(`http://localhost:3000/qa/${randomQ}`);
      check(res, {
        'status was 200': r => r.status == 200,
      }) || errorRate.add(1);
      sleep(.001);
  }

  // for (let i = 0; i < 100; i++) {
  //   let randomA = Math.floor(Math.random() * (25354644 - 1) + 1);
  
  //   let res = http.get(`http://localhost:3000/qa/${randomA}/answers`);
  //   check(res, {
  //     'status was 200': r => r.status == 200,
  //   }) || errorRate.add(1);
  //   sleep(.001);
  // }
}