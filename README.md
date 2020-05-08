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

### Local 

### Deployed

![table](/images/table.png)

## Scaling Plan
<ul>
<li> Based on the benchmarking the backend can currently achieve approximately 700 RPS on the deployed backend while keeping the max total response time below the desired 2 seconds. However, the p95 is approximately 200ms, which can be improved, but is a good starting point.
</li>
<li> Due to monetary constraints, horizontal scaling rather than vertical will be utilized. Therefore, more servers and a load balancer would be beneficial. At least two more servers will be setup on EC2 instances and connected with NginX as a load balancer, utilizing a a round-robin balancing approach.
</li>
<li> After the additional servers and load balancer another series of stress tests will be performed. If more improvements are needed the focus will shift towards the database. Sharding the database is one method that could be implemented to increase the reading efficiency, since that is the most common and most costly.
</li>
</ul>

