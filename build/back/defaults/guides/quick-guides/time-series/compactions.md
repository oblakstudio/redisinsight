With compactions, you could aggregate the data into one minute buckets in order to compact data points and reduce the database size (for example, if you have collected more than one billion data points in a day).

Data rewriting is not performed on the original time series - the compaction happens in a new series, while the original one stays the same.

Let's firstly create a new time series to work with.

Then we will create a compaction rule to group data points into buckets and average them using this new time series.

```redis Create a compaction rule.
TS.CREATE   // Let’s create the second time series to use for compaction
    sensor1_compacted // Keyname
    RETENTION 2678400000 // Trims the timeseries to values of up to one month (in milliseconds)
    region east // label
 
TS.CREATERULE // Creates a rule to group data points from sensor1
    sensor1 // Source Key
    sensor1_compacted // Destination key
    AGGREGATION avg 60000 // Group data points added to the sensor1 time series into buckets of 60 seconds (60000ms) and average them
```
Compaction rules can be deleted when no longer needed:

```redis Delete a compaction rule
TS.DELETERULE
    sensor1 // Source Key
    sensor1_compacted // Destination Key
```
