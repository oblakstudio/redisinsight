**You can index and query vector data stored in Redis [Hashes](https://redis.io/topics/data-types#hashes)**  This capability extends RediSearch's abilities to index NUMERIC, GEO and TEXT data stored in hashes.

**The ability to index and query vector data is provided by Vector Similarity Search (VSS).** VSS powers advanced search applications working on unstructured data.

A growing number of pre-trained Computer Vision and Natural Language processing models allows you to generate a vector representation of images, videos, audio, and long pieces of text.

**Some of the most common applications built on top of VSS are:**
* E-Commerce Visual Similarity: Recommending "visually similar" products within a price range or geo-location
* E-Commerce Semantic Similarity: Recommending "semantically similar" products matching a description provided by end user
* Chatbots / Q&A systems: Finding most similar questions (and their answers) to a question posted by an end user


### PRE-REQUISITES
**You will need:**

[Redis Stack](https://redis.io/download) >=6.2.2-v0 \
OR \
[RediSearch](https://oss.redis.com/redisearch/) >=2.4.3 \
OR \
A free Redis Stack instance on [Redis Cloud](https://redis.com/try-free/?utm_source=redis\&utm_medium=app\&utm_campaign=redisinsight_vecsim_guide "Redis Cloud").
