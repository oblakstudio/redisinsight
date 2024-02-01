## Manage data points

To add new samples to a time series, use the `TS.ADD` and `TS.MADD` commands. Note that if the series does not exist, it will be automatically created.

```redis:[run_confirmation=true] Add data points to a time series
TS.ADD // adds a new data point
    bike_sales_1 // new key name
    1000 // timestamp, simplified for these examples
    100 // value
 
TS.MADD // adds data points to multiple time series
    bike_sales_2 1000 80
    bike_sales_3 1000 172
    bike_sales_4 1000 90
    bike_sales_5 1000 15
 
TS.ADD 
    bike_sales_0
    * // use the current timestamp (milliseconds since Epoch)
    50
```

Use `TS.GET` to retrieve the last sample and the last sample matching a specific filter.

```redis Read
TS.GET bike_sales_1 // gets the last sample in the time series
TS.MGET FILTER region=east // returns the last sample from all time series with region=east
```

You can also add to or update an existing time series using the `TS.ADD` command.

```redis:[run_confirmation=true] Update a time series sample
TS.ADD // use TS.ADD to update an existing sample
    bike_sales_1 // key name for the time series you would like to update
    1000 // existing timestamp
    26 // new value
    ON_DUPLICATE LAST // override existing value with the new one
```

To delete samples, specify the interval (inclusive) between two timestamps for a given time series.

```redis:[run_confirmation=true] Delete
TS.DEL bike_sales_1 999 1000 // deletes all the data points between two timestamps (inclusive)
 
TS.DEL bike_sales_2 1000 1000 // to delete a single timestamp, use it as both the "from" and the "to" timestamp
```

### TS.INCRBY and TS.DECRBY

Increase (`TS.INCRBY`) or decrease (`TS.DECRBY`) the value of the sample with the maximum existing timestamp, or create a new sample with a value equal to the value of the sample with the maximum existing timestamp with a given increment.

```redis:[run_confirmation=true] TS.INCRBY example
TS.INCRBY bike_sales_3 1 // increases the latest sample by one to 173
TS.GET bike_sales_3
```

```redis:[run_confirmation=true] TS.DECRBY example
TS.DECRBY bike_sales_3 1 // decreases the latest sample by one to 172
TS.GET bike_sales_3
```

See the `TS.INCRBY` and `TS.DECRBY` command pages for more information about these two commands, including how they can be used to create new time series.

### Delete time series

Use the `DEL` command to delete one or more time series.
