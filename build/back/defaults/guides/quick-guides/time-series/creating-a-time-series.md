### Create and delete a time series.

First, let's delete the time series 'sensor1' if it exist

```redis Delete
EXPIRE sensor1 120 // Sets expiration of the time series to 120 seconds
 
DEL sensor1 // Deletes the entire time series immediately
```

Let's create a new time series.

```redis Create
TS.CREATE // Creates a new time series
    sensor1 // Keyname for the time series
    LABELS // Adds a label that can be either string or numeric values. Labels are key-value metadata we attach to data points, allowing us to group and filter. 
    area_id 32 // Label with area_id = 32
    region east // Label with region = east
    
```
Use the `TS.INFO` command to get all the information and statistics about a time series.

```redis Get Time Series Information
TS.INFO sensor1 // Returns information and statistics on sensor1
 
TS.QUERYINDEX area_id=32 // Get all the time series matching with area_id=32
```

### Manage data points

You can append new samples to your time series. Note that if the series does not exist, it will be automatically created.

```redis Add
TS.ADD // Adds a new data point
    sensor1 // Keyname for the time series
    1626434638000 // Timestamp
    26 // Value
 
TS.MADD // Adds multiple data points to a time series
    sensor1 // Keyname for the first time series
    1626434639000 // Timestamp
    28 // Value
    sensor1 // Keyname for the second time series, which can be different
    1626434640000 // Timestamp
    35 // Value
    sensor1 // Keyname for the second time series, which can be different
    1626434641000 // Timestamp
    32 // Value
 
TS.ADD 
    sensor1
    * // Will use the current timestamp
    50
```

Let's get the last sample and the last sample matching the specific filter.

```redis Read
TS.GET sensor1 // Gets the last sample in the time series
 
TS.MGET FILTER area_id=32 // Returns the last sample from a time series with area_id=32
```

You can also update an existing time series using the `TS.ADD` command.

```redis Update a Time Series
TS.ADD // Using TS.ADD to update an existing sample
    sensor1 // Keyname for the time series you would like to update
    1626434639000 // Existing timestamp
    26 // New value
    ON_DUPLICATE LAST // Override existing value with the new one
```

To delete samples, specify the interval (inclusive) between two timestamps for a given time series.

```redis Delete
TS.DEL sensor1 1626434629000 1626434639000 // Deletes all the data points between two timestamps (inclusive)
 
TS.DEL sensor1 1626434639000 1626434639000 // To delete a single timestamp, use it as both the "from" and "to" timestamp
```
