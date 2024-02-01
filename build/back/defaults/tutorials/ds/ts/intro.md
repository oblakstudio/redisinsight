Redis supports a time series data structure, allowing Redis to function as a time series database.

Common examples of time series data include:

* Sensor data: e.g., temperatures or fan velocities for servers in a server farm.
* Stock prices.
* The number of vehicles passing through a given road (e.g., counts per minute).

Common examples for applications that use time series databases:

* IoT & Sensor Monitoring: monitor and react to a stream of events emitted by devices.
* Application Performance/Health Monitoring: monitor the performance and availability of applications and services.
* Real-time Analytics: process, analyze, and react in real-time (e.g., for selling equities, performing predictive maintenance, product recommendations, or price adjustments).

You can ingest and query millions of samples and events at the speed of Redis. 

### Prerequisites

[Redis Stack Server](https://redis.io/download?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials) >=7.2.0-v7 \
OR \
[RedisTimeSeries](https://oss.redis.com/redistimeseries/) >=1.10.11 \
OR \
A free Redis Stack instance on [Redis Cloud](https://redis.com/try-free/?utm_source=redis\&utm_medium=app\&utm_campaign=redisinsight_timeseries_guide "Redis Cloud").
