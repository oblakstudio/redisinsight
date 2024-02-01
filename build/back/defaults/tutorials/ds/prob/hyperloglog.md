In this tutorial you will learn how to use the HyperLogLog (HLL) probabilistic data structure in a bike shop use case.

HyperLogLog is a probabilistic data structure that estimates the number of unique elements (cardinality) of a set. As a probabilistic data structure, HLL trades perfect accuracy for efficient space utilization.
The Redis HLL implementation uses at most 12 KB of memory and provides a standard error of 0.81%.

A common use case for HLLs is to track the number unique visits to a web resource. HLLs help answer questions like:

- How many unique visits has this page had on this day?
- How many unique users have played this song?
- How many unique users have viewed this video?

You can use one HLL per page (video/song) and period, and every IP/identifier is added to it on every visit.

The `PFADD` command is used to create and add items to a HLL key. There are a few different usages:

- When only the key name is passed, a new HLL will be created if one does not already exists. If the key didn't already exist, `1` is returned; otherwise, `0` is returned.
- When a key name and one or more elements are passed, a new HLL will be created and the elements will be added to it.
If the cardinality is changed as a result of the operation, `1` is returned; otherwise, `0` is returned.

```redis:[run_confirmation=true] Create a new HLL set
PFADD bikes // returns 1
```

```redis:[run_confirmation=true] Try to re-create bikes
PFADD bikes // returns 0
```

```redis:[run_confirmation=true] Add elements to bikes
PFADD bikes Hyperion Deimos Phoebe Quaoar // returns 1
```

```redis:[run_confirmation=true] Try to duplicate an item already present on bikes
PFADD bikes Deimos // returns 0
```

To get the cardinality of a HLL set, use the `PFCOUNT` command. Remember that the returned value is only an estimation for very large sets of data.

```redis Get the cardinality of bikes
PFCOUNT bikes
```

Now create another HLL called `commuter_bikes`.

```redis:[run_confirmation=true] Create a new HLL set
PFADD commuter_bikes Salacia Mimas Quaoar
```

```redis Get the cardinalties of both bikes and commuter_bikes
PFCOUNT bikes commuter_bikes // returns 6 because Quaoar was present on both HLLs
```

Use the `PFMERGE` command to merge two HLLs into a single HLL. Note: if the destination key already contains a HLL, it's data will be part of the merged data.

```redis:[run_confirmation=true] Merge bikes and commuter_bikes
PFMERGE all_bikes bikes commuter_bikes
```

Now get the cardinality of `all_bikes`:

```redis Get the cardinality of all_bikes
PFCOUNT all_bikes
```
