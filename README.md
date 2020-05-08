# Questions and Answers Backend System
Ecommerce Retail Portal (Tiger-Eye) - Back-End

## Overview

Replaced a legacy backend system for an Ecommerce retail website's questions and answers section. Previous legacy data needed to be preserved and integrated into the new system. Furthermore, to test the system, more data was generated to get up to 10 million primary key (questions) entries. RESTful API routes were created for the server to interact with the SQL database. The backend was stress tested locally and optimized with proper database indexing and querying.

After the system was optimized locally, the backend was deployed to AWS. The database and server were each setup on their own EC2 instances. Then the system was stress tested in production. 

### Tech Stack Used

* Node.js
* Express
* PostgreSQL
* AWS t2-micro instances
* K6
* New Relic

## Stress Test Results

All tests were run utilizing K6. Each virtual user (VU) was simulating a GET request to read all questions for a random product. This GET questions request is the most time consumptive due to the total amount of data being transfered, which is why it was used for benchmarking. The main metrics being analyzed were total http response time (ms), error rate (%), and requests per second (RPS).

### Local 

Ran 2, 5 minute tests with varying VUs while holding iteration loop count, sleep time, and duration constant. The averaged between the two tests are the displayed data.

![res_time](/images/local_res_time.png)
![RPS_VUs](/images/local_RPS.png)

### Deployed

Ran 2, 30 second tests with varying VUs while holding iteration loop count, sleep time, and duration constant.

![res_time_30s](/images/response_time_30s.png)
![RPS_VUs_30s](/images/RPS_vs_VUs_30s.png)

Increased the test time to 5 minutes to determine the time effects.

![res_time_5min](/images/response_time_5min.png)
![RPS_VUs_5min](/images/RPS_vs_VUs_5min.png)

The table below compares the averages between the 30 second and 5 minute test results.

![table](/images/table.png)

The total VUs were increased, keeping all other test parameters constant, until the max http response time surpassed the desired 2 second limit.

![high_VUs](/images/deployed.png)

<ul>
<li> Summary </li>
<ul> 
<li> Longer K6 testing times lead to higher RPS and shorter http request duration (aka response time) </li>
<li> More VUs correlated with higher RPS but longer response time  </li>
<li> No errors throughout testing </li>
<li> THe local backend system was more efficient compared to the deployed system, with an average response time of approximately 60 ms at a similar 730 RPS </li>
<li> The deployed backend could handle approximately 730 RPS, with an average http reponse time of 122 ms, and 0% error rate </li>
</ul>
</ul>


## Scaling Plan
<ul>
<li> Based on the benchmarking the backend can currently achieve approximately 700 RPS on the deployed backend while keeping the max total response time below the desired 2 seconds. However, the p95 is approximately 200ms, which can be improved, but is a good starting point.
</li>
<li> Due to monetary constraints, horizontal scaling rather than vertical will be utilized. Therefore, more servers and a load balancer would be beneficial. At least two more servers will be setup on EC2 instances and connected with NginX as a load balancer, utilizing a a round-robin balancing approach.
</li>
<li> After the additional servers and load balancer another series of stress tests will be performed. If more improvements are needed the focus will shift towards the database. Sharding the database is one method that could be implemented to increase the reading efficiency, since that is the most common and most costly.
</li>
</ul>

