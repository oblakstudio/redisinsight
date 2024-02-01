In this tutorial you will learn how to use the Top-K data structure in a bike shop use case.

A Top-K maintains a list of *K* most frequently seen items.

To get started, initialize a Top-K with a width (the number of counters kept in each array), depth (the number of arrays), and decay (the probability of reducing a counter in an occupied bucket).

```redis:[run_confirmation=true] Initialize a Top-K
TOPK.RESERVE bikes:keywords 50 2000 7 0.925 // initializes the Top-K with 50 counters kept in each array, 2000 arrays and 0.925 probability of reducing a counter in an occupied bucket
```

Next, add items to the Top-K filter.

Note that if an item enters the Top-K list, the item which is expelled from the list to make room for it is returned.

```redis:[run_confirmation=true] Add items
TOPK.ADD bikes:keywords store seat handlebars handles pedals tires store seat
```

You can increase the score of an item in the Top-K by a given increment. “nil” is returned if no change to the Top-K list occurred. If the modified item entered the Top-K list as a result of the increment operation, then the item dropped from the list to make room for it is returned.

```redis:[run_confirmation=true] Increase the score
TOPK.INCRBY bikes:keywords store 3 seat 2 handles 30 // increases the score of "store" by 3, "seat" by 2 and "handles" by 30.
```

Now check whether an item is one of the Top-K items or not.

```redis Check if in Top-K items
TOPK.QUERY bikes:keywords handles nonexist // for each item requested, returns 1 if item is in Top-K, otherwise 0.
```

To see the full list of items in our Top-K list, use the `TOPK.LIST` command.

```redis Return the full list
TOPK.LIST bikes:keywords
```

You can see the number of required items (k), width, depth, and decay values in your Top-K.

```redis Get information about the Top-K
TOPK.INFO bikes:keywords
```
