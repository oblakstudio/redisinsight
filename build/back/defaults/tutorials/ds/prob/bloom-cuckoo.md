In this tutorial you will learn how to use Bloom and cuckoo filters, which are resource efficient data structures, in a bike shop use case.

## Bloom filters

A Bloom filter allows you to check if an element is present in a set in a memory-efficient and scalable way. A query will return one of two possible answers:

1. the element *might* be in the set
2. the element is definitely not in the set

In other words, a Bloom filter will guarantee the absence of an element in a set, but it can only give an estimation about its presence. False positives are entirely possible. See [this Wikipedia article](https://en.wikipedia.org/wiki/Bloom_filter) for more detailed information about false positives and their frequency.

Despite the uncertainty involved when using Bloom filters, they are still valuable for many applications.

How can a Bloom filter be helpful to an online bike shop service? For starters, you can use a Bloom filter to store the usernames of people who've already registered with the shop. When someone creates a new account, the system can very quickly check if the user's proposed username is available. If the answer is yes, you can confirm using your primary database. But, if the answer is no, further checks are not required and registration can proceed.

Another use case is targeting ads to users. A per-user Bloom filter can be created and populated with all the products each user has purchased from the shop. When the shop's ad suggestion engine provides a list of possible ads to show a user, it can check each item against the user's Bloom filter. Each item that is not part of the filter are good targets. For each item that might already be part of the filter, a second query can be made to the primary database to confirm. If the second confirmation is negative, then that ad can be added to the target list.

First, create a bloom filter and configure an acceptable false positive rate for your use case.
You can also specify an initial capacity; the size of the dataset that you expect to add to the filter. Bloom filters can be configured to expand when this capacity is reached - [see the `BF.RESERVE` documentation for details](https://redis.io/commands/bf.reserve/?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials).

```redis:[run_confirmation=true] Create a Bloom filter
BF.RESERVE user:778:bought_products 0.001 50 // create new bloom filter at key "user:778:bought_products" with a desired false positive rate of 0.1% (0.001) and anticipated data set size of 50 entries
```

Next, add some products for user 778.

```redis:[run_confirmation=true] Add all bought product IDs to a Bloom filter
BF.MADD user:778:bought_products 4545667 9026875 3178945 4848754 1242449 // Add five items to user 778's list
```

Next, run a couple of queries.

```redis Has a user bought this product?
BF.EXISTS  user:778:bought_products 1234567  // No, the user has not bought this product
BF.EXISTS  user:778:bought_products 3178945  // The user might have bought this product
BF.MEXISTS user:778:bought_products 01234567 4545667 // determines if one or more items exist in the filter
```

You can get information about your bloom filter using the `BF.INFO` command:

```redis Information about the filter
BF.INFO user:778:bought_products // returns information about the bloom filter at key "user:778:bought_products"
```

Inserting items into a Bloom filter that doesn't yet exist will create the filter for you.

```redis:[run_confirmation=true] Create and add items simultaneously
BF.INSERT bloomFilter ITEMS foo bar baz // creates the "bloomFilter" key and adds three items to it, if the filter does not already exist
BF.INSERT newBloomFilter CAPACITY 10000 ITEMS hello waves goodbye // creates the "newBloomFilter" key and adds three items to it, if the filter does not already exist
BF.INSERT bloomF NOCREATE ITEMS foo bar // tries to add 2 items to a filter with an error if the filter does not already exist
```

You can read more about Bloom filters and their use cases [here](https://redis.io/docs/data-types/probabilistic/bloom-filter/?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials). See [here](https://redis.io/commands/?group=bf&utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials) for the complete list of Bloom filter commands.

## Cuckoo Filters

[Cuckoo filters](https://en.wikipedia.org/wiki/Cuckoo_filter), which are similar to Bloom filters, are used to determine, with a high degree of certainty, whether or not an element is a member of a filter. Unlike Bloom filters, you can delete items from a cuckoo filter. Unlike Bloom filters, you can add the same element multiple times to a Cuckoo filter (see the `CF.COUNT` example below).

To begin, create a cuckoo filter with estimated capacity, defined bucket size (the number of items in each bucket), and maximum number of iterations (number of attempts to swap items between buckets).

```redis:[run_confirmation=true] Create a cuckoo filter
CF.RESERVE bikes:models 100 BUCKETSIZE 10 MAXITERATIONS 2 // creates a “cuckoo” filter for the initial amount of 100 items, 10 items per bucket and 2 iterations to swap items before creating an additional filter
```

**Note:**
> `BUCKETSIZE`, `MAXITERATIONS`, and `EXPANSION` are optional arguments and default to `2`, `20`, `1`, respectively.

Next, add items to the cuckoo filter.
Note that `CF.ADD` creates a new filter if one doesn't already exist.

```redis:[run_confirmation=true] Add Items
CF.ADD bikes:models "Smokey Mountain Striker"
CF.ADD bikes:models "Cloudy City Cruiser"
CF.ADD bikes:models "Rocky Mountain Racer"
CF.ADD bikes:models "Smokey Mountain Striker" // second addition of Smokey...
```

Use the `CF.EXISTS` command to determine whether or not an item may exist in the cuckoo filter.

```redis Check if item may exist
CF.EXISTS bikes:models "Smokey Mountain Striker" // returns “1”, the item may exist
CF.EXISTS bikes:models "Non-existant model" // returns “0”, the item certainly does not exist
```

Cuckoo filters support deletion. Here's an example.

```redis:[run_confirmation=true] Delete an item
CF.DEL bikes:models "Smokey Mountain Striker" // delete the "Smokey Mountain Striker" item once from the filter
```

If an item was added more than once to a filter, and you delete it once, the item will still be present.

You also can see the number of times an item may be in the filter.
Note that because this is a probabilistic data structure, the count may not necessarily be accurate.

```redis Count Items
CF.COUNT bikes:models "Smokey Mountain Striker"
```

Use the `CF.INFO` command to retrieve information about your cuckoo filter:

```redis Information about the filter
CF.INFO cuckoo
```
