The previous tutorial showed that the `TS.RANGE` and `TS.REVRANGE` commands can take an optional `AGGREGATION` argument. Aggregations using the `RANGE` commands allow you to make ad hoc queries using, perhaps, a different aggregator than what you've used in your aggregation rules. In the following example, data are aggregated the `avg` function, calculating and reporting average daily sales for a bike shop.

```redis AGGREGATION in action
TS.RANGE bike_sales_1 - + AGGREGATION avg 86400000
```
