These tutorials will demonstrate Redis's' ability to store time series data using the bike shop use case.

The bike shop company consists of multiple physical stores and an online presence. It would be helpful to have an aggregate view of sales volume across all the stores.

### Create a time series

You create time series using the `TS.CREATE` command. `TS.CREATE` requires one argument, the `key`, and can also take several optional arguments. These are:

- `RETENTION period` - where `period` is the maximum age for samples compared to the highest reported timestamp in milliseconds. When set to 0, which is the default, samples never expire.
- `ENCODING enc` - where `enc` is one of `COMPRESSED` (default) or `UNCOMPRESSED`. `COMPRESSED` is almost always the right choice. Compression not only saves memory, as much as a 90% reductions, but also improves performance due to fewer required memory accesses. Exceptions include: highly irregular timestamps or values.
- `CHUNK_SIZE size` - where `size` is the initial allocation size in bytes for the data part of each new chunk. Actual chunks may consume more memory. Changing chunk size using TS.ALTER does not affect existing chunks. `size` must be a multiple of 8 in the range 48 to 1048576 (1 MB). The default size is 4096, representing a single page of memory.
- `DUPLICATE_POLICY policy` -  defines the policy for handling insertion of multiple samples with identical timestamps. See the `TS.CREATE` manual page for the complete list of policies. The default policy is `BLOCK`, which means that Redis will ignore any newly reported values and reply with an error.
- `LABELS label value [label value...]` - a set of label-value pairs that represent metadata labels for the key and serve as a secondary index.

The following example creates a time series key for each of five bike shops that will track the total sales for each. Each key has an appropriate region label, `east` or `west`, and also a label indicating that the time series is not compacted. The labels allow you to query bike sales performance over specific periods on a per-shop or per-region basis.

```redis:[run_confirmation=true] Create time series for each shop
TS.CREATE bike_sales_1 DUPLICATE_POLICY SUM LABELS region east compacted no
TS.CREATE bike_sales_2 DUPLICATE_POLICY SUM LABELS region east compacted no
TS.CREATE bike_sales_3 DUPLICATE_POLICY SUM LABELS region west compacted no
TS.CREATE bike_sales_4 DUPLICATE_POLICY SUM LABELS region west compacted no
TS.CREATE bike_sales_5 DUPLICATE_POLICY SUM LABELS region west compacted no
```

The DUPLICATE_POLICY SUM policy tells Redis to combine two or more samples with an identical timestamp as the sum of both.

Now use the `TS.INFO` command to get all the information and statistics about a time series.

```redis Get time series information
TS.INFO bike_sales_1 // Returns information and statistics about bike_sales_1
TS.QUERYINDEX region=east // Get all the time series matching region = east
```

### Alter time series

You can use the `TS.ALTER` command to modify time series post-creation. `TS.ALTER` takes nearly the same arguments as `TS.CREATE`, except you can't alter the encoding. The behavior of some of the arguments is slightly different than when creating a time series.

- `RETENTION period` - same as `TS.CREATE`.
- `CHUNK_SIZE size` - changing this value will not affect existing chunks.
- `DUPLICATE_POLICY policy` - same as `TS.CREATE`.
- `LABELS label value [label value...]` - if you wish to preserve existing labels, you must provide them as part of the `TS.ALTER` command.

Here are a couple of examples.

```redis:[run_confirmation=true] Alter labels incorrectly
TS.ALTER bike_sales_1 LABELS region west // change the region from east to west, but forgetting to include the other label
TS.INFO bike_sales_1 // note how the compacted/no label-value pair was dropped
TS.ALTER bike_sales_1 LABELS region east compacted no // change it back
TS.INFO bike_sales_1
```

```redis:[run_confirmation=true] Alter the duplicate policy
TS.MADD bike_sales_1 1000 1 bike_sales_1 1000 2 bike_sales_1 1000 3 // first add some samples; more about this later
TS.GET bike_sales_1 // because DUPLICATE POLICY is set to SUM, the returned value is 6
TS.ALTER bike_sales_1 DUPLICATE_POLICY MIN
TS.ADD bike_sales_1 1000 1
TS.GET bike_sales_1 // because DUPLICATE_POLICY is set to MIN, the returned value is 1
```
