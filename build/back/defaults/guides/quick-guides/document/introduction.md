In Redis, you can model documents using:
*   [Hashes](https://redis.io/topics/data-types#hashes)
*   [JSON](https://redis.io/docs/data-types/json/?utm_source=redis\&utm_medium=app\&utm_campaign=redisinsight_doc_guide) (Redis Stack only)

**Hashes** are a collection of flat field-value pairs and a great choice for representing rows in a relational database table.

**JSON** is best for representing documents in a document store, specially when there is a need to store nested objects and arrays. 

Redis Hashes and JSON are being used to model documents across various industries, from real-time inventory management in retail, through fraud detection in financial services, matching drivers with riders in digital mobility, all the way to endpoint protection in cybersecurity.

In the rest of this guide we'll show how you can automatically index your data, filter by properties, numeric ranges and geographical distance, as well as run full text search and complex aggregations. 

### PRE-REQUISITES
**You will need:**

[Redis Stack Server](https://redis.io/download) >=6.2.0-v0 \
OR \
[RediSearch](https://redis.io/docs/interact/search-and-query/?utm_source=redis\&utm_medium=app\&utm_campaign=redisinsight_doc_guide) >=2.0 and [RedisJSON](https://redis.io/docs/data-types/json/?utm_source=redis\&utm_medium=app\&utm_campaign=redisinsight_doc_guide) >=2.0 \
OR \
A free Redis Stack instance on [Redis Cloud](https://redis.com/try-free/?utm_source=redis\&utm_medium=app\&utm_campaign=redisinsight_doc_guide "Redis Cloud").





