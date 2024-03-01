### The `TS.GET` command

`TS.GET` is used to get the sample with the highest timestamp from a given time series. It reports both the timestamp and the value.

```redis TS.GET from bike_sales_3
TS.GET bike_sales_3 // 500.79 @ timestamp 1648062372210
```

When `LATEST` is provided as the last argument and with a compaction, `TS.GET` reports the compacted value of the latest (possibly partial) bucket. Without LATEST, `TS.GET` does not report the latest (possibly partial) bucket. When a time series is not a compaction, LATEST is ignored.

```redis TS.GET from bike_sales_3_per_day
TS.GET bike_sales_3_per_day LATEST // 500.78
```

### The `TS.MGET` command

`TS.MGET' works like `TS.GET` except that it takes a `FILTER` argument in place of a `KEY` argument that allows you to retrieve the sample with the highest timestamp from each time series matching a specified filter.

Each filter expression has one of the following syntaxes:

| Filter syntax | Description |
| ------------- | ----------- |
| `label!=` | the time series has a label named `label` |
| `label=value` | the time series has a label named `label` with a value equal to `value` |
| `label=(value1,value2,...)` | the time series has a label named `label` with a value equal to one of the values in the list |
| `label=` | the time series does not have a label named `label` |
| `label!=value` | the time series does not have a label named `label` with a value equal to `value` |
| `label!=(value1,value2,...)` | the time series does not have a label named `label` with a value equal to any of the values in the list |

Notes:

- At least one filter expression with a syntax label=value or label=(value1,value2,...) is required.
- Filter expressions are conjunctive. For example, the filter type=temperature room=study means that a time series is a temperature time series of a study room.
- Whitespaces are not permitted in a filter expression except between quotes or double quotes in values; e.g., `x="y y"` or `x='(y y,z z)'`.

```redis TS.MGET using east as the filter
TS.MGET FILTER region=east nosuchlabel=
```

`TS.MGET` can also take a `LATEST` argument. It works in exactly the same way as `TS.GET`.

Two other arguments can be provided:

- `WITHLABELS` - includes in the reply all label-value pairs representing metadata labels of the time series. If WITHLABELS or SELECTED_LABELS are not specified, by default, an empty list is reported as label-value pairs.

- `SELECTED_LABELS label...` - (since RedisTimeSeries v1.6) returns a subset of the label-value pairs that represent metadata labels of the time series. Use when a large number of labels exists per series, but only the values of some of the labels are required. If WITHLABELS or SELECTED_LABELS are not specified, by default, an empty list is reported as label-value pairs.

**Note**:
> If `WITHLABELS` or `SELECTED_LABELS` are not specified, an empty list is reported as label-value pairs.

**Note**:
> The `TS.MGET` command cannot be part of a transaction when running on a Redis cluster.

```redis TS.MGET using WITHLABELS
TS.MGET WITHLABELS FILTER region=east
```

### `TS.RANGE` and `TS.REVRANGE`

Use the `TS.RANGE` or `TS.REVRANGE` commands to retrieve samples in forward or reverse order, respectively, with or without aggregation. These commands are useful for ad hoc queries.

The range commands require three arguments:

1. the time series key
1. the starting timestamp, `-` for the earliest timestamp
1. the ending timestamp, `+` for the latest timestamp

```TS.RANGE basic usage
TS.RANGE bike_sales_1 1641024000000 1643659199000
```

```TS.REVRANGE basic usage
TS.RANGE bike_sales_1 1641024000000 1643659199000
```

There are optional arguments for each of the `RANGE` commands:

- `LATEST` - the same as with `TS.GET` and `TS.MGET`.
- `FILTER_BY_TS` - filter by a space-separated list of timestamps.
- `FILTER_BY_VALUE` - filter by a range of values.
- `COUNT` - when used without `AGGREGATION`, it limits the number of reported samples. When used with `AGGREGATION` it limits the number of reported buckets.
- `ALIGN` - is a time bucket alignment control for `AGGREGATION`. It controls the time bucket timestamps by changing the reference timestamp on which a bucket is defined. See the manual page for more information.
- `AGGREGATION` - the same set of aggregator functions you've already seen with `TS.CREATERULE` are available for the `RANGE` commands.
- `BUCKETTIMESTAMP` - controls how bucket timestamps are reported. See the manual page for more information.
- `EMPTY` - is a flag, which, when specified, reports aggregations for empty buckets. See the manual page for more information.

**Note**:
> When filters are used with aggregation, they are applied before aggregation.

Here are some examples:

```redis FILTER_BY_TS in action
TS.RANGE bike_sales_1 - + FILTER_BY_TS 1641496930054 1647883329149
```

```redis FILTER_BY_VALUE in action
TS.RANGE bike_sales_3_per_day - + FILTER_BY_VALUE 3000 5000
```

```redis COUNT in action
TS.RANGE bike_sales_3 - + COUNT 10
```

### `TS.MRANGE` and `TS.MREVRANGE`

`TS.MRANGE` and `TS.MREVRANGE` are nearly identical to their `RANGE` counterparts, except: (1) they do not have a key argument (they apply to all keys, (2) they require a label-based `FILTER` argument, and (3) they may optionally take a `GROUPBY/REDUCE` argument.

The `GROUPBY/REDUCE` arguments allow you to group results by a specific label and then apply a reducer, which is another level of aggregation.

The `GROUPBY` syntax is: `GROUPBY label REDUCE reducer`. The available reducer functions is a subset of the available aggregators:

- `avg`
- `sum`
- `min`
- `max`
- `range`
- `count`
- `std.p`
- `std.s`
- `var.p`
- `var.s`

```redis TS.MRANGE with GROUPBY/REDUCE
TS.MRANGE - + WITHLABELS COUNT 5 FILTER region=(east) GROUPBY region REDUCE sum
```
