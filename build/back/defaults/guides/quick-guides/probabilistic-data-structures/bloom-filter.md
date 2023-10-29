Bloom filters are used to determine, with a high degree of certainty, whether an element is a member of a set.

Let's create a bloom filter and configure an acceptable false positive rate for our use case.
We can also specify an initial capacity - the size of the dataset that we expect to add to the filter. Bloom filters can be configured to expand when this capacity is reached - [see the `BF.RESERVE` documentation for details](https://oss.redis.com/redisbloom/Bloom_Commands/#bfreserve).

```redis Create Filter
BF.RESERVE bloom 0.001 100 // create new bloom filter at key “bloom” with a desired false positive rate of 0.1% (0.001) and anticipated data set size of 100 entries

```

So let's add items to our new bloom filter:

```redis Add Items
BF.ADD bloom foo // adds the “foo” item
BF.MADD bloom bar baz // adds "bar" and "baz" items

```
Now we can determine whether an item may exist in the bloom filter or not.

```redis Check If an Item Exists
BF.EXISTS bloom foo // returns “1”: the item may exist
BF.EXISTS bloom foo1 // returns “0”: the item certainly does not exist
BF.MEXISTS bloom bar baz // determines if one or more items exist in the filter or not

```
You can get information about your bloom filter using the `BF.INFO` command:

```redis Information About The Filter
BF.INFO bloom // returns information about the bloom filter at key "bloom"

```
Inserting items into a Bloom filter that doesn't exist yet will create the filter for you.

```redis Create And Add Items
BF.INSERT bloomFilter ITEMS foo bar baz // creates the "bloomFilter" key and adds three items to it, if the filter does not already exist
BF.INSERT newBloomFilter CAPACITY 10000 ITEMS hello // creates the "newBloomFilter" key and adds three items to it, if the filter does not already exist
BF.INSERT bloomF NOCREATE ITEMS foo bar // tries to add 2 items to a filter with an error if the filter does not already exist


```
