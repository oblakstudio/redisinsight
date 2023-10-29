[Cuckoo filters](https://en.wikipedia.org/wiki/Cuckoo_filter) are used to determin e, with a high degree of certainty, whether an element is a member of a set. They are quick on check operations and also allow deletions.

Let's create a cuckoo filter with estimated capacity for the filter, defined bucket size (number of items in each bucket) and maximum number of iterations (number of attempts to swap items between buckets).

```redis Create Filter
CF.RESERVE cuckoo 100 BUCKETSIZE 10 MAXITERATIONS 2 // creates a “cuckoo” filter for the initial amount of 100 for items, 10 items in each bucket and 2 iterations to swap items before creating an additional filter

```

Let's add items to the cuckoo filter.
Note that `CF.ADD` creates a new filter for us if one doesn't already exist.

```redis Add Items
CF.ADD cuckoo foo
CF.ADD cuckoo bar
CF.ADD cuckoo baz
CF.ADD cuckoo baz

```

Now we can determine whether an item may exist in the cuckoo filter or not.

```redis Check If Item May Exist
CF.EXISTS cuckoo foo // returns “1”: the item may exist
CF.EXISTS cuckoo foo1 // returns “0”: the item certainly does not exist

```

Cuckoo filters support deletion of items. Let's delete an item from our filter.

```redis Delete An Item
CF.DEL cuckoo bar // delete the “bar” item once from the filter
CF.DEL cuckoo baz // if the item was added multiple times, it will still be present

```

You also can see the number of times an item may be in the filter.
Note that because this is a probabilistic data structure, the count may not necessarily be accurate.

```redis Count Items
CF.COUNT cuckoo baz

```

Use the `CF.INFO` command to find more information about your cuckoo filter:

```redis Information About The Filter
CF.INFO cuckoo

```

