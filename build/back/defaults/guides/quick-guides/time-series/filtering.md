You can filter by value, timestamp and by labels.
 
```redis Filtering by label
TS.MRANGE - + FILTER area_id=32 // Shows data from all time series that have a label of area_id with a value of 32. The results will be grouped by time series.

```

Let's see only the information that fits into a specific range of values.

```redis Filtering by value
TS.RANGE sensor1 - + FILTER_BY_VALUE 25 55 // Returns all data points whose value sits between 25 and 30, inclusive.
 
TS.MRANGE - +  FILTER_BY_VALUE 25 55 FILTER region=east // Filters on multiple series
```

We also can filter the data based on timestamps.

```redis Filtering by specific timestamps
TS.RANGE sensor1 - + FILTER_BY_TS 1626434640000 1626434641000 // Retrieves the data points for specific timestamps from one time series
 
TS.MRANGE - +  FILTER_BY_TS 1626434640000 1626434641000 FILTER region=east // Retrieves the data points for specific timestamps from multiple time series
```
