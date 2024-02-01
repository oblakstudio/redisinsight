The JSON capability of Redis Stack provides JavaScript Object Notation (JSON) support for Redis, which allows Redis to function as a document database.
It lets you store, update, and retrieve JSON values in a Redis database, similar to any other Redis data type. Redis JSON also works seamlessly with Search and Query to let you index and query JSON documents.

Primary features include:

- Full support for the JSON standard.
- [JSONPath](https://goessner.net/articles/JsonPath/) syntax for selecting/updating elements inside documents.
- Documents are stored as binary data in a tree structure, allowing fast access to sub-elements.
- Typed atomic operations for all JSON value types.

### Prerequisites

[Redis Stack](https://redis.io/download?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials) >=7.2.0-v7 \
OR \
[RedisJSON](https://github.com/RedisJSON/RedisJSON/) >=2.6.8 \
OR \
A free Redis Stack instance on [Redis Cloud](https://redis.com/try-free/?utm_source=redis\&utm_medium=app\&utm_campaign=redisinsight_vecsim_guide "Redis Cloud").
