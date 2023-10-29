Redis supports **probabilistic data structures** that give a very reasonable approximation of an answer quickly and with significantly less memory overhead than their deterministic counterparts.
The following data structures trade perfect accuracy for extreme memory efficiency, so they're especially useful for big data and streaming applications:
* Bloom filter
* Cuckoo filter
* Count-Min sketch
* Top-k

**Bloom filter:**
* Enables you to check if an element is present in a set using a fixed size (sublinear) memory space, sacrificing some precision
* Uses multiple hash functions to create a representation of the element on a bit array
* Answers the question "Is this element present in the set?"
* A negative answer means that the element is not present in a set (accurate result)
* A positive answer means that the element most likely present in the set (false positives are possible; the error rate is controllable).
* The error rate can be configured when the filter is created

**Cuckoo filter:**
* Same purpose as Bloom filters, but also allow deletion of elements
* Shows better results than Bloom filters under certain circumstances

**Count-Min sketch**
* Estimates the frequency of events/elements in a stream of data
* Consumes a stream of events/elements and keeps estimates of their frequency
* Can only be trusted for counts above a certain threshold
* Biased: results can be higher than reality, but never lower

**Top K**
* Used to estimate the K highest-rank elements from a stream
* Optimized for large (elephant) flows; biased on small (mouse) flows
* Notification when an element is removed from the top k list
* Discards older approaches like "count-all" and "admit-all-count-some" in favor of a "count-with-exponential-decay" strategy


### PRE-REQUISITES
**You will need:**

[Redis Stack Server](https://redis.io/download) >=6.2.0-v0 \
OR \
[RedisBloom](https://oss.redis.com/redisbloom/) >=2.0 \
OR \
A free Redis Stack instance on [Redis Cloud](https://redis.com/try-free/?utm_source=redis\&utm_medium=app\&utm_campaign=redisinsight_probabilistic_guide "Redis Cloud").


