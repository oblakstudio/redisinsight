Lists, sets, and sorted sets are great for many use cases, but the hash data type is on a higher level. Redis hashes are maps (sequences of field-value pairs) and are used to represent objects in Redis. Consider the following example that shows how to create a hash key using the `HSET` command.

Redis hashes are record types that are structured as name-value pairs. Consider the following example that shows how to create a hash key using the `HSET` command.

```redis:[run_confirmation=true] Create a hash
HSET bike:1 model Deimos brand Ergonom type "Enduro bikes" price 4972
```

`HSET` returns the number of added name-value pairs.

To retrieve the stored data, use the `HGETALL` command.

```redis HGETALL usage
HGETALL bike:1 // returns all the name-value pairs associated with the key
```

If you only want the values of a subset of the fields, use the `HGET` command.

```redis HGET usage
HGET bike:1 price
```

You can update fields in a hash using `HSET` by specifying a subset of its name-value pairs.

```redis:[run_confirmation=true] Update an existing hash
HSET bike:1 model "Kraken" price 3000
```

Use the `HDEL` command to delete one or more fields from a hash. Once all fields are removed, the hash key itself will be deleted.

```redis:[run_confirmation=true] Delete hash fields and keys
HDEL bike:1 model
HGETALL bike:1
HDEL bike:1 brand type price
HGETALL bike:1
EXISTS bike:1
```

Integer values in hash keys can be incremented or decremented in the same way as simple string keys using the `HINCRBY` command.
The increment value must be a positive or negative integer.

```redis Hash INCRBY usage
HINCRBY bike:1 price 100
HINCRBY bike:1 price -100
```

See [here](https://redis.io/docs/data-types/hashes?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials) for the hash type reference page, and [here](https://redis.io/commands/?group=hash?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials) for the entire set of Redis hash commands.
