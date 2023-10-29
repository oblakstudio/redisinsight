A Top-K maintains a list of k most frequently seen items.

Let's initialize a Top-K with a width (a number of counters kept in each array), depth (number of arrays) and decay (probability of reducing a counter in an occupied bucket).

```redis Initialize a Top-K
TOPK.RESERVE TopK 50 2000 7 0.925 // initializes the Top-K with 50 counters kept in each array, 2000 arrays and 0.925 probability of reducing a counter in an occupied bucket

```

Let's add items to the Top-K filter.

Note that if an item enters the Top-K list, the item which is expelled from the list to make room for it is returned.

```redis Add Items
TOPK.ADD TopK foo bar 42 // adds “foo”, “bar” and “42” items to the Top-K.

```

You can increase the score of an item in the Top-K by a given increment.

This returns “nil” if no change to Top-K list occurred.  If the item modified entered the Top-K list as a result, then the item dropped from the list to make room for it is returned.

```redis Increase The Score
TOPK.INCRBY TopK foo 3 bar 2 42 30 // increases the score of “foo” by 3, “bar” by 2 and “42” by 30.

```
Now we can check whether an item is one of the Top-K items or not.

```redis Check If In Top-K items
TOPK.QUERY TopK 42 nonexist // for each item requested, returns 1 if item is in Top-K, otherwise 0.

```

Let's see the full list of items in our Top-K list.

```redis Return The Full List
TOPK.LIST TopK

```
You can see the number of required items (k), width, depth and decay values in your Top-K.

```redis Get Information About The Top-K
TOPK.INFO TopK

```