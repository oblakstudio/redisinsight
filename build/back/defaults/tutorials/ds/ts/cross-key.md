`TS.MRANGE` and `TS.REVMRANGE` can also take an optional `AGGREGATION` argument. This allows you to run queries across different keys using different filters. In the following example, the specified filter looks across time series keys that have a matching `region` label, calculates the daily average using the `AGGREGATION` clause, and groups the data by region and applying the `sum` reducer function.

```
TS.MRANGE - + WITHLABELS FILTER region=(east,west) AGGREGATION avg 86400000 GROUPBY region REDUCE sum
```
