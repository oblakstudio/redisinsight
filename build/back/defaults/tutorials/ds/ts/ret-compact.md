## Retention

When you create a new time series, you have the option to specify a retention period.
A retention period is the maximum age for samples compared to the highest reported timestamp, in milliseconds.
Samples are expired based on the difference between their timestamps and the timestamps passed to subsequent `TS.ADD` commands.

```redis:[run_confirmation=true] Create a time series with RETENTION
TS.CREATE ts RETENTION 86400000 // samples expire after one full day
```

When `RETENTION` set to 0, samples never expire. When `RETENTION` is not specified, the option is set to the global `RETENTION_POLICY` configuration of the database, which by default is zero.

```redis:[run_confirmation=true] Add a sample to ts
TS.ADD ts 1640995200000 1000.0
```

```redis:[run_confirmation=true] Add a sample with a much later timestamp
TS.ADD ts 1672560000000 2000.0 // the previous sample will be deleted
```

```redis Get all samples
TS.RANGE ts - +
```

## Compaction

Say you have millions of samples in your database for a single key, and you want a way to aggregate that data into useful buckets for later processing. For bike sales, you may wish to view data per day, week, month, and year. Redis allows you to do this without modifying your original data.

Time series compactions are created using the `TS.CREATERULE` command. Each rule specifies:

- the source key, that is, where the data is coming from
- the destination key, a new key where data will be aggregated
- the aggregator function
- the duration of each bucket in milliseconds

The following aggregation functions are available:

| Aggregator   | Description                                                                    |
| ------------ | ------------------------------------------------------------------------------ |
| `avg`        | Arithmetic mean of all values                                                  |
| `sum`        | Sum of all values                                                              |
| `min`        | Minimum value                                                                  |
| `max`        | Maximum value                                                                  |
| `range`      | Difference between the highest and the lowest value                            |
| `count`      | Number of values                                                               |
| `first`      | Value with lowest timestamp in the bucket                                      |
| `last`       | Value with highest timestamp in the bucket                                     |
| `std.p`      | Population standard deviation of the values                                    |
| `std.s`      | Sample standard deviation of the values                                        |
| `var.p`      | Population variance of the values                                              |
| `var.s`      | Sample variance of the values                                                  |
| `twa`        | Time-weighted average over the bucket's timeframe (since RedisTimeSeries v1.8) |

Note the following:

- Only new samples that are added into the source series after the creation of the rule will be aggregated.
- Calling `TS.CREATERULE` with a nonempty destKey may result in inconsistencies between the raw and the compacted data.
- Explicitly adding samples to a compacted time series may result in inconsistencies between the raw and the compacted data. The compaction process may override such samples.
- If no samples are added to the source time series during a bucket period, no compacted sample is added to the destination time series.
- The timestamp of a compacted sample added to the destination time series is set to the start timestamp of the appropriate compaction bucket. For example, for a 10-minute compaction bucket with no alignment (see the `alignTimestamp` option in the `TS.CREATERULE` manual page), the compacted sample- timestamps are x:00, x:10, x:20, and so on.
- Deleting a compacted time series will cause the compaction rule to be deleted as well, but the source time series will not be affected.
- On a clustered environment, hash tags should be used to force sourceKey and destKey to be stored in the same hash slot.

Create time series for each of the five bike shops you've seen previously.

```redis:[run_confirmation=true] Create time series for each bike shop
TS.CREATE bike_sales_1 DUPLICATE_POLICY SUM LABELS region east
TS.CREATE bike_sales_2 DUPLICATE_POLICY SUM LABELS region east
TS.CREATE bike_sales_3 DUPLICATE_POLICY SUM LABELS region west
TS.CREATE bike_sales_4 DUPLICATE_POLICY SUM LABELS region west
TS.CREATE bike_sales_5 DUPLICATE_POLICY SUM LABELS region west
```

Next, create compaction rules for each shop that will aggregate total daily bike sales using the `sum` aggregator.

```redis:[run_confirmation=true] Create compaction rules
TS.CREATERULE
    bike_sales_1 // source key
    bike_sales_1_per_day // destination key
    AGGREGATION sum 86400000 // group data for bike_sales_1 into day-sized buckets, where the values are summed

TS.CREATE bike_sales_2_per_day LABELS region east compacted yes
TS.CREATERULE bike_sales_2 bike_sales_2_per_day AGGREGATION sum 86400000

TS.CREATE bike_sales_3_per_day LABELS region west compacted yes
TS.CREATERULE bike_sales_3 bike_sales_3_per_day AGGREGATION sum 86400000

TS.CREATE bike_sales_4_per_day LABELS region west compacted yes
TS.CREATERULE bike_sales_4 bike_sales_4_per_day AGGREGATION sum 86400000

TS.CREATE bike_sales_5_per_day LABELS region west compacted yes
TS.CREATERULE bike_sales_5 bike_sales_5_per_day AGGREGATION sum 86400000
```

Next, add a bunch of data.

```redis:[run_confirmation=true] Bulk load bike shop data
TS.ADD bike_sales_1 1640995200000 0
TS.ADD bike_sales_2 1640995200000 0
TS.ADD bike_sales_3 1640995200000 0
TS.ADD bike_sales_4 1640995200000 0
TS.ADD bike_sales_3 1641036752229 4753.21
TS.ADD bike_sales_3 1641047249527 2528.12
TS.ADD bike_sales_2 1641042045678 1666.23
TS.ADD bike_sales_4 1641042146401 3638.42
TS.ADD bike_sales_2 1641056934545 2226.55
TS.ADD bike_sales_2 1641032217758 2936.76
TS.ADD bike_sales_4 1641042188063 2861.72
TS.ADD bike_sales_1 1641059571005 1181.07
TS.ADD bike_sales_5 1641041464226 2289.55
TS.ADD bike_sales_1 1641081600000 0
TS.ADD bike_sales_2 1641081600000 0
TS.ADD bike_sales_3 1641081600000 0
TS.ADD bike_sales_4 1641081600000 0
TS.ADD bike_sales_1 1641168000000 0
TS.ADD bike_sales_2 1641168000000 0
TS.ADD bike_sales_3 1641168000000 0
TS.ADD bike_sales_4 1641168000000 0
TS.ADD bike_sales_2 1641233554568 354.1
TS.ADD bike_sales_1 1641254400000 0
TS.ADD bike_sales_2 1641254400000 0
TS.ADD bike_sales_3 1641254400000 0
TS.ADD bike_sales_4 1641254400000 0
TS.ADD bike_sales_4 1641322256310 2671.49
TS.ADD bike_sales_2 1641319915676 1219.61
TS.ADD bike_sales_2 1641326025440 2449.07
TS.ADD bike_sales_2 1641316678045 553.26
TS.ADD bike_sales_1 1641340800000 0
TS.ADD bike_sales_2 1641340800000 0
TS.ADD bike_sales_3 1641340800000 0
TS.ADD bike_sales_4 1641340800000 0
TS.ADD bike_sales_4 1641412064064 2660.26
TS.ADD bike_sales_1 1641427200000 0
TS.ADD bike_sales_2 1641427200000 0
TS.ADD bike_sales_3 1641427200000 0
TS.ADD bike_sales_4 1641427200000 0
TS.ADD bike_sales_2 1641491218680 1261.35
TS.ADD bike_sales_1 1641496930054 1088.78
TS.ADD bike_sales_1 1641513600000 0
TS.ADD bike_sales_2 1641513600000 0
TS.ADD bike_sales_3 1641513600000 0
TS.ADD bike_sales_4 1641513600000 0
TS.ADD bike_sales_4 1641578214991 2942.94
TS.ADD bike_sales_4 1641579082787 863.63
TS.ADD bike_sales_3 1641578729663 2695.12
TS.ADD bike_sales_5 1641577127982 364.33
TS.ADD bike_sales_4 1641580577107 2262.57
TS.ADD bike_sales_1 1641600000000 0
TS.ADD bike_sales_2 1641600000000 0
TS.ADD bike_sales_3 1641600000000 0
TS.ADD bike_sales_4 1641600000000 0
TS.ADD bike_sales_1 1641663189710 2754.61
TS.ADD bike_sales_2 1641638199126 3734.39
TS.ADD bike_sales_2 1641647464970 1769.37
TS.ADD bike_sales_5 1641637150469 3975.63
TS.ADD bike_sales_2 1641657909252 3510.92
TS.ADD bike_sales_1 1641686400000 0
TS.ADD bike_sales_2 1641686400000 0
TS.ADD bike_sales_3 1641686400000 0
TS.ADD bike_sales_4 1641686400000 0
TS.ADD bike_sales_1 1641772800000 0
TS.ADD bike_sales_2 1641772800000 0
TS.ADD bike_sales_3 1641772800000 0
TS.ADD bike_sales_4 1641772800000 0
TS.ADD bike_sales_3 1641839450379 1151.2
TS.ADD bike_sales_1 1641842680559 619.62
TS.ADD bike_sales_1 1641840938574 1284.55
TS.ADD bike_sales_5 1641843924045 245.27
TS.ADD bike_sales_4 1641842134129 2829.23
TS.ADD bike_sales_1 1641859200000 0
TS.ADD bike_sales_2 1641859200000 0
TS.ADD bike_sales_3 1641859200000 0
TS.ADD bike_sales_4 1641859200000 0
TS.ADD bike_sales_3 1641926051435 425.03
TS.ADD bike_sales_1 1641927142169 141.99
TS.ADD bike_sales_2 1641922950124 2787.63
TS.ADD bike_sales_1 1641929321519 908.73
TS.ADD bike_sales_1 1641945600000 0
TS.ADD bike_sales_2 1641945600000 0
TS.ADD bike_sales_3 1641945600000 0
TS.ADD bike_sales_4 1641945600000 0
TS.ADD bike_sales_2 1642016331770 1986.63
TS.ADD bike_sales_1 1642032000000 0
TS.ADD bike_sales_2 1642032000000 0
TS.ADD bike_sales_3 1642032000000 0
TS.ADD bike_sales_4 1642032000000 0
TS.ADD bike_sales_2 1642101977993 776.84
TS.ADD bike_sales_3 1642100709715 1355.34
TS.ADD bike_sales_1 1642118400000 0
TS.ADD bike_sales_2 1642118400000 0
TS.ADD bike_sales_3 1642118400000 0
TS.ADD bike_sales_4 1642118400000 0
TS.ADD bike_sales_5 1642180159281 403.36
TS.ADD bike_sales_5 1642181139821 2354.71
TS.ADD bike_sales_5 1642179749368 2098.87
TS.ADD bike_sales_4 1642188179686 2195.21
TS.ADD bike_sales_3 1642188388735 582.7
TS.ADD bike_sales_1 1642204800000 0
TS.ADD bike_sales_2 1642204800000 0
TS.ADD bike_sales_3 1642204800000 0
TS.ADD bike_sales_4 1642204800000 0
TS.ADD bike_sales_3 1642252427007 3192.7
TS.ADD bike_sales_1 1642267388009 4553.39
TS.ADD bike_sales_4 1642244446630 3337.66
TS.ADD bike_sales_1 1642257010727 4755.21
TS.ADD bike_sales_1 1642263793495 1275.97
TS.ADD bike_sales_5 1642253670216 1494.88
TS.ADD bike_sales_1 1642262885410 3653.41
TS.ADD bike_sales_3 1642242996579 4205.09
TS.ADD bike_sales_1 1642291200000 0
TS.ADD bike_sales_2 1642291200000 0
TS.ADD bike_sales_3 1642291200000 0
TS.ADD bike_sales_4 1642291200000 0
TS.ADD bike_sales_1 1642377600000 0
TS.ADD bike_sales_2 1642377600000 0
TS.ADD bike_sales_3 1642377600000 0
TS.ADD bike_sales_4 1642377600000 0
TS.ADD bike_sales_4 1642444324018 2249.47
TS.ADD bike_sales_1 1642442222806 1395.69
TS.ADD bike_sales_1 1642439701186 1624.51
TS.ADD bike_sales_1 1642464000000 0
TS.ADD bike_sales_2 1642464000000 0
TS.ADD bike_sales_3 1642464000000 0
TS.ADD bike_sales_4 1642464000000 0
TS.ADD bike_sales_3 1642532137959 1317.87
TS.ADD bike_sales_1 1642529646425 685.65
TS.ADD bike_sales_5 1642533233793 1034.63
TS.ADD bike_sales_1 1642550400000 0
TS.ADD bike_sales_2 1642550400000 0
TS.ADD bike_sales_3 1642550400000 0
TS.ADD bike_sales_4 1642550400000 0
TS.ADD bike_sales_2 1642622268621 2204.21
TS.ADD bike_sales_1 1642636800000 0
TS.ADD bike_sales_2 1642636800000 0
TS.ADD bike_sales_3 1642636800000 0
TS.ADD bike_sales_4 1642636800000 0
TS.ADD bike_sales_3 1642705189819 1749.9
TS.ADD bike_sales_4 1642706394952 405.28
TS.ADD bike_sales_1 1642723200000 0
TS.ADD bike_sales_2 1642723200000 0
TS.ADD bike_sales_3 1642723200000 0
TS.ADD bike_sales_4 1642723200000 0
TS.ADD bike_sales_5 1642792592450 370.26
TS.ADD bike_sales_3 1642794747120 1435.79
TS.ADD bike_sales_1 1642809600000 0
TS.ADD bike_sales_2 1642809600000 0
TS.ADD bike_sales_3 1642809600000 0
TS.ADD bike_sales_4 1642809600000 0
TS.ADD bike_sales_5 1642845756228 2371.73
TS.ADD bike_sales_5 1642847592436 2597.52
TS.ADD bike_sales_3 1642852156344 1950.88
TS.ADD bike_sales_2 1642864157273 3658.54
TS.ADD bike_sales_4 1642849089514 3062.72
TS.ADD bike_sales_1 1642896000000 0
TS.ADD bike_sales_2 1642896000000 0
TS.ADD bike_sales_3 1642896000000 0
TS.ADD bike_sales_4 1642896000000 0
TS.ADD bike_sales_1 1642982400000 0
TS.ADD bike_sales_2 1642982400000 0
TS.ADD bike_sales_3 1642982400000 0
TS.ADD bike_sales_4 1642982400000 0
TS.ADD bike_sales_5 1643051360934 1464.74
TS.ADD bike_sales_3 1643049771217 460.03
TS.ADD bike_sales_5 1643052489952 2447.65
TS.ADD bike_sales_1 1643068800000 0
TS.ADD bike_sales_2 1643068800000 0
TS.ADD bike_sales_3 1643068800000 0
TS.ADD bike_sales_4 1643068800000 0
TS.ADD bike_sales_5 1643135491007 1276.34
TS.ADD bike_sales_1 1643140377708 2732.6
TS.ADD bike_sales_4 1643134695717 378.39
TS.ADD bike_sales_4 1643132253714 1640.86
TS.ADD bike_sales_3 1643133947583 2350.04
TS.ADD bike_sales_1 1643155200000 0
TS.ADD bike_sales_2 1643155200000 0
TS.ADD bike_sales_3 1643155200000 0
TS.ADD bike_sales_4 1643155200000 0
TS.ADD bike_sales_2 1643219916329 2127.65
TS.ADD bike_sales_1 1643218694989 1862.83
TS.ADD bike_sales_1 1643241600000 0
TS.ADD bike_sales_2 1643241600000 0
TS.ADD bike_sales_3 1643241600000 0
TS.ADD bike_sales_4 1643241600000 0
TS.ADD bike_sales_2 1643304274356 803.99
TS.ADD bike_sales_1 1643304250649 1927.15
TS.ADD bike_sales_1 1643328000000 0
TS.ADD bike_sales_2 1643328000000 0
TS.ADD bike_sales_3 1643328000000 0
TS.ADD bike_sales_4 1643328000000 0
TS.ADD bike_sales_3 1643392885792 326.04
TS.ADD bike_sales_1 1643414400000 0
TS.ADD bike_sales_2 1643414400000 0
TS.ADD bike_sales_3 1643414400000 0
TS.ADD bike_sales_4 1643414400000 0
TS.ADD bike_sales_2 1643462708565 1971.25
TS.ADD bike_sales_1 1643469142549 2113.58
TS.ADD bike_sales_4 1643451787588 3618.76
TS.ADD bike_sales_5 1643458097521 1172.82
TS.ADD bike_sales_5 1643452674084 4238.72
TS.ADD bike_sales_1 1643454601610 4888.02
TS.ADD bike_sales_1 1643500800000 0
TS.ADD bike_sales_2 1643500800000 0
TS.ADD bike_sales_3 1643500800000 0
TS.ADD bike_sales_4 1643500800000 0
TS.ADD bike_sales_1 1643587200000 0
TS.ADD bike_sales_2 1643587200000 0
TS.ADD bike_sales_3 1643587200000 0
TS.ADD bike_sales_4 1643587200000 0
TS.ADD bike_sales_5 1643650029289 1093.82
TS.ADD bike_sales_1 1643652123292 2365.72
TS.ADD bike_sales_5 1643658311394 1499.2
TS.ADD bike_sales_4 1643656165256 2602.24
TS.ADD bike_sales_2 1643651473465 2396.72
TS.ADD bike_sales_1 1643673600000 0
TS.ADD bike_sales_2 1643673600000 0
TS.ADD bike_sales_3 1643673600000 0
TS.ADD bike_sales_4 1643673600000 0
TS.ADD bike_sales_1 1643735633913 404.85
TS.ADD bike_sales_3 1643739352940 2938.93
TS.ADD bike_sales_5 1643743507203 2611.96
TS.ADD bike_sales_1 1643760000000 0
TS.ADD bike_sales_2 1643760000000 0
TS.ADD bike_sales_3 1643760000000 0
TS.ADD bike_sales_4 1643760000000 0
TS.ADD bike_sales_2 1643825910113 2825.98
TS.ADD bike_sales_1 1643822036063 270.43
TS.ADD bike_sales_4 1643825071122 1984.7
TS.ADD bike_sales_4 1643830295360 1206.48
TS.ADD bike_sales_1 1643846400000 0
TS.ADD bike_sales_2 1643846400000 0
TS.ADD bike_sales_3 1643846400000 0
TS.ADD bike_sales_4 1643846400000 0
TS.ADD bike_sales_3 1643916892906 2985.74
TS.ADD bike_sales_4 1643917432887 1909.59
TS.ADD bike_sales_3 1643910662793 1619.09
TS.ADD bike_sales_5 1643917756576 1822.93
TS.ADD bike_sales_1 1643932800000 0
TS.ADD bike_sales_2 1643932800000 0
TS.ADD bike_sales_3 1643932800000 0
TS.ADD bike_sales_4 1643932800000 0
TS.ADD bike_sales_5 1643995302194 2722.73
TS.ADD bike_sales_4 1644000067642 2254.49
TS.ADD bike_sales_3 1644003526995 2614.96
TS.ADD bike_sales_2 1644001000096 825.79
TS.ADD bike_sales_1 1644019200000 0
TS.ADD bike_sales_2 1644019200000 0
TS.ADD bike_sales_3 1644019200000 0
TS.ADD bike_sales_4 1644019200000 0
TS.ADD bike_sales_3 1644069469940 3924.99
TS.ADD bike_sales_1 1644083786296 1289.01
TS.ADD bike_sales_5 1644079326681 4612.71
TS.ADD bike_sales_5 1644058894080 1865.0
TS.ADD bike_sales_4 1644082293689 2535.28
TS.ADD bike_sales_5 1644074167399 3336.23
TS.ADD bike_sales_1 1644105600000 0
TS.ADD bike_sales_2 1644105600000 0
TS.ADD bike_sales_3 1644105600000 0
TS.ADD bike_sales_4 1644105600000 0
TS.ADD bike_sales_1 1644192000000 0
TS.ADD bike_sales_2 1644192000000 0
TS.ADD bike_sales_3 1644192000000 0
TS.ADD bike_sales_4 1644192000000 0
TS.ADD bike_sales_1 1644260655242 1684.47
TS.ADD bike_sales_1 1644278400000 0
TS.ADD bike_sales_2 1644278400000 0
TS.ADD bike_sales_3 1644278400000 0
TS.ADD bike_sales_4 1644278400000 0
TS.ADD bike_sales_4 1644343905197 238.17
TS.ADD bike_sales_1 1644364800000 0
TS.ADD bike_sales_2 1644364800000 0
TS.ADD bike_sales_3 1644364800000 0
TS.ADD bike_sales_4 1644364800000 0
TS.ADD bike_sales_3 1644426760699 1733.52
TS.ADD bike_sales_4 1644436726442 1590.98
TS.ADD bike_sales_5 1644429118079 717.76
TS.ADD bike_sales_3 1644435671863 2919.5
TS.ADD bike_sales_1 1644433295113 2974.71
TS.ADD bike_sales_1 1644451200000 0
TS.ADD bike_sales_2 1644451200000 0
TS.ADD bike_sales_3 1644451200000 0
TS.ADD bike_sales_4 1644451200000 0
TS.ADD bike_sales_4 1644521305434 1239.53
TS.ADD bike_sales_4 1644514004091 2795.85
TS.ADD bike_sales_1 1644522342049 2205.5
TS.ADD bike_sales_1 1644514817867 808.3
TS.ADD bike_sales_3 1644514892199 570.97
TS.ADD bike_sales_1 1644537600000 0
TS.ADD bike_sales_2 1644537600000 0
TS.ADD bike_sales_3 1644537600000 0
TS.ADD bike_sales_4 1644537600000 0
TS.ADD bike_sales_3 1644600889036 1516.66
TS.ADD bike_sales_2 1644599630320 1791.65
TS.ADD bike_sales_3 1644605664576 1469.08
TS.ADD bike_sales_1 1644624000000 0
TS.ADD bike_sales_2 1644624000000 0
TS.ADD bike_sales_3 1644624000000 0
TS.ADD bike_sales_4 1644624000000 0
TS.ADD bike_sales_4 1644684468321 4486.56
TS.ADD bike_sales_1 1644686884201 3161.07
TS.ADD bike_sales_5 1644665846836 2870.47
TS.ADD bike_sales_5 1644674917079 3087.52
TS.ADD bike_sales_5 1644676128005 3506.64
TS.ADD bike_sales_1 1644661648148 3500.79
TS.ADD bike_sales_4 1644681176434 4020.62
TS.ADD bike_sales_3 1644662371996 4171.72
TS.ADD bike_sales_1 1644710400000 0
TS.ADD bike_sales_2 1644710400000 0
TS.ADD bike_sales_3 1644710400000 0
TS.ADD bike_sales_4 1644710400000 0
TS.ADD bike_sales_1 1644796800000 0
TS.ADD bike_sales_2 1644796800000 0
TS.ADD bike_sales_3 1644796800000 0
TS.ADD bike_sales_4 1644796800000 0
TS.ADD bike_sales_4 1644860722849 528.19
TS.ADD bike_sales_5 1644862769224 985.09
TS.ADD bike_sales_1 1644883200000 0
TS.ADD bike_sales_2 1644883200000 0
TS.ADD bike_sales_3 1644883200000 0
TS.ADD bike_sales_4 1644883200000 0
TS.ADD bike_sales_4 1644946550327 1950.95
TS.ADD bike_sales_1 1644969600000 0
TS.ADD bike_sales_2 1644969600000 0
TS.ADD bike_sales_3 1644969600000 0
TS.ADD bike_sales_4 1644969600000 0
TS.ADD bike_sales_2 1645031501627 2655.43
TS.ADD bike_sales_5 1645033126690 2051.99
TS.ADD bike_sales_4 1645040513584 2148.47
TS.ADD bike_sales_4 1645039779210 530.2
TS.ADD bike_sales_1 1645056000000 0
TS.ADD bike_sales_2 1645056000000 0
TS.ADD bike_sales_3 1645056000000 0
TS.ADD bike_sales_4 1645056000000 0
TS.ADD bike_sales_3 1645120042066 2946.26
TS.ADD bike_sales_1 1645142400000 0
TS.ADD bike_sales_2 1645142400000 0
TS.ADD bike_sales_3 1645142400000 0
TS.ADD bike_sales_4 1645142400000 0
TS.ADD bike_sales_4 1645212020507 2376.35
TS.ADD bike_sales_1 1645228800000 0
TS.ADD bike_sales_2 1645228800000 0
TS.ADD bike_sales_3 1645228800000 0
TS.ADD bike_sales_4 1645228800000 0
TS.ADD bike_sales_2 1645292647574 2214.18
TS.ADD bike_sales_1 1645282335535 1752.62
TS.ADD bike_sales_2 1645278014108 4554.14
TS.ADD bike_sales_3 1645284194739 2810.31
TS.ADD bike_sales_4 1645283563479 3736.82
TS.ADD bike_sales_1 1645270761404 2832.54
TS.ADD bike_sales_1 1645284667793 2065.05
TS.ADD bike_sales_2 1645283628248 2257.08
TS.ADD bike_sales_3 1645281075355 2325.75
TS.ADD bike_sales_3 1645276384313 1155.28
TS.ADD bike_sales_1 1645315200000 0
TS.ADD bike_sales_2 1645315200000 0
TS.ADD bike_sales_3 1645315200000 0
TS.ADD bike_sales_4 1645315200000 0
TS.ADD bike_sales_1 1645401600000 0
TS.ADD bike_sales_2 1645401600000 0
TS.ADD bike_sales_3 1645401600000 0
TS.ADD bike_sales_4 1645401600000 0
TS.ADD bike_sales_2 1645467575733 1147.99
TS.ADD bike_sales_1 1645463714561 1974.42
TS.ADD bike_sales_3 1645468820340 927.37
TS.ADD bike_sales_5 1645471077895 1609.0
TS.ADD bike_sales_2 1645463428835 2619.53
TS.ADD bike_sales_1 1645488000000 0
TS.ADD bike_sales_2 1645488000000 0
TS.ADD bike_sales_3 1645488000000 0
TS.ADD bike_sales_4 1645488000000 0
TS.ADD bike_sales_5 1645557166007 234.75
TS.ADD bike_sales_2 1645550119753 838.53
TS.ADD bike_sales_2 1645552954740 1318.97
TS.ADD bike_sales_5 1645554369617 2374.72
TS.ADD bike_sales_3 1645552985139 2131.1
TS.ADD bike_sales_1 1645574400000 0
TS.ADD bike_sales_2 1645574400000 0
TS.ADD bike_sales_3 1645574400000 0
TS.ADD bike_sales_4 1645574400000 0
TS.ADD bike_sales_4 1645637990028 2460.1
TS.ADD bike_sales_1 1645642129654 2855.58
TS.ADD bike_sales_1 1645660800000 0
TS.ADD bike_sales_2 1645660800000 0
TS.ADD bike_sales_3 1645660800000 0
TS.ADD bike_sales_4 1645660800000 0
TS.ADD bike_sales_1 1645731827531 1393.12
TS.ADD bike_sales_1 1645728731919 1309.74
TS.ADD bike_sales_3 1645732134683 2906.22
TS.ADD bike_sales_1 1645747200000 0
TS.ADD bike_sales_2 1645747200000 0
TS.ADD bike_sales_3 1645747200000 0
TS.ADD bike_sales_4 1645747200000 0
TS.ADD bike_sales_3 1645817502051 1087.93
TS.ADD bike_sales_4 1645810149337 663.51
TS.ADD bike_sales_5 1645808704256 1587.48
TS.ADD bike_sales_3 1645816258470 346.05
TS.ADD bike_sales_1 1645833600000 0
TS.ADD bike_sales_2 1645833600000 0
TS.ADD bike_sales_3 1645833600000 0
TS.ADD bike_sales_4 1645833600000 0
TS.ADD bike_sales_1 1645878311257 3080.67
TS.ADD bike_sales_4 1645889505516 4644.86
TS.ADD bike_sales_5 1645877563209 3905.58
TS.ADD bike_sales_2 1645891304949 1697.72
TS.ADD bike_sales_4 1645878485033 1619.03
TS.ADD bike_sales_2 1645872292515 4166.95
TS.ADD bike_sales_1 1645920000000 0
TS.ADD bike_sales_2 1645920000000 0
TS.ADD bike_sales_3 1645920000000 0
TS.ADD bike_sales_4 1645920000000 0
TS.ADD bike_sales_1 1646006400000 0
TS.ADD bike_sales_2 1646006400000 0
TS.ADD bike_sales_3 1646006400000 0
TS.ADD bike_sales_4 1646006400000 0
TS.ADD bike_sales_5 1646073828878 1950.91
TS.ADD bike_sales_3 1646078138317 202.68
TS.ADD bike_sales_2 1646074642518 147.98
TS.ADD bike_sales_3 1646072697257 721.44
TS.ADD bike_sales_1 1646092800000 0
TS.ADD bike_sales_2 1646092800000 0
TS.ADD bike_sales_3 1646092800000 0
TS.ADD bike_sales_4 1646092800000 0
TS.ADD bike_sales_4 1646162923669 2559.02
TS.ADD bike_sales_1 1646160330124 1521.42
TS.ADD bike_sales_1 1646179200000 0
TS.ADD bike_sales_2 1646179200000 0
TS.ADD bike_sales_3 1646179200000 0
TS.ADD bike_sales_4 1646179200000 0
TS.ADD bike_sales_3 1646241563455 669.97
TS.ADD bike_sales_5 1646240743082 2986.28
TS.ADD bike_sales_1 1646265600000 0
TS.ADD bike_sales_2 1646265600000 0
TS.ADD bike_sales_3 1646265600000 0
TS.ADD bike_sales_4 1646265600000 0
TS.ADD bike_sales_1 1646331626276 2225.34
TS.ADD bike_sales_1 1646337081287 784.85
TS.ADD bike_sales_4 1646333782696 2262.15
TS.ADD bike_sales_1 1646352000000 0
TS.ADD bike_sales_2 1646352000000 0
TS.ADD bike_sales_3 1646352000000 0
TS.ADD bike_sales_4 1646352000000 0
TS.ADD bike_sales_5 1646416152924 1028.24
TS.ADD bike_sales_1 1646438400000 0
TS.ADD bike_sales_2 1646438400000 0
TS.ADD bike_sales_3 1646438400000 0
TS.ADD bike_sales_4 1646438400000 0
TS.ADD bike_sales_1 1646480350315 4739.8
TS.ADD bike_sales_5 1646479399538 2070.4
TS.ADD bike_sales_5 1646499969035 1981.45
TS.ADD bike_sales_4 1646499168102 2479.99
TS.ADD bike_sales_2 1646480392246 3573.39
TS.ADD bike_sales_3 1646480592006 3189.64
TS.ADD bike_sales_2 1646481675869 4599.81
TS.ADD bike_sales_3 1646483161541 2031.86
TS.ADD bike_sales_1 1646491036331 2289.75
TS.ADD bike_sales_2 1646500386276 2999.32
TS.ADD bike_sales_1 1646524800000 0
TS.ADD bike_sales_2 1646524800000 0
TS.ADD bike_sales_3 1646524800000 0
TS.ADD bike_sales_4 1646524800000 0
TS.ADD bike_sales_1 1646611200000 0
TS.ADD bike_sales_2 1646611200000 0
TS.ADD bike_sales_3 1646611200000 0
TS.ADD bike_sales_4 1646611200000 0
TS.ADD bike_sales_2 1646680564663 1785.55
TS.ADD bike_sales_5 1646678606208 2796.3
TS.ADD bike_sales_1 1646697600000 0
TS.ADD bike_sales_2 1646697600000 0
TS.ADD bike_sales_3 1646697600000 0
TS.ADD bike_sales_4 1646697600000 0
TS.ADD bike_sales_1 1646768512448 2636.62
TS.ADD bike_sales_5 1646768591113 2301.67
TS.ADD bike_sales_1 1646784000000 0
TS.ADD bike_sales_2 1646784000000 0
TS.ADD bike_sales_3 1646784000000 0
TS.ADD bike_sales_4 1646784000000 0
TS.ADD bike_sales_1 1646854998962 784.96
TS.ADD bike_sales_1 1646870400000 0
TS.ADD bike_sales_2 1646870400000 0
TS.ADD bike_sales_3 1646870400000 0
TS.ADD bike_sales_4 1646870400000 0
TS.ADD bike_sales_4 1646936272948 2372.96
TS.ADD bike_sales_5 1646931738869 2800.65
TS.ADD bike_sales_1 1646941302540 1596.35
TS.ADD bike_sales_1 1646932924202 470.23
TS.ADD bike_sales_3 1646932593481 1802.61
TS.ADD bike_sales_1 1646956800000 0
TS.ADD bike_sales_2 1646956800000 0
TS.ADD bike_sales_3 1646956800000 0
TS.ADD bike_sales_4 1646956800000 0
TS.ADD bike_sales_1 1647020111307 1879.4
TS.ADD bike_sales_2 1647025967657 470.64
TS.ADD bike_sales_1 1647022233227 587.48
TS.ADD bike_sales_1 1647043200000 0
TS.ADD bike_sales_2 1647043200000 0
TS.ADD bike_sales_3 1647043200000 0
TS.ADD bike_sales_4 1647043200000 0
TS.ADD bike_sales_1 1647095567811 1652.79
TS.ADD bike_sales_1 1647104034222 3654.49
TS.ADD bike_sales_3 1647087091474 2120.37
TS.ADD bike_sales_3 1647091207600 4231.58
TS.ADD bike_sales_3 1647106682414 3139.33
TS.ADD bike_sales_5 1647080129501 2868.9
TS.ADD bike_sales_1 1647129600000 0
TS.ADD bike_sales_2 1647129600000 0
TS.ADD bike_sales_3 1647129600000 0
TS.ADD bike_sales_4 1647129600000 0
TS.ADD bike_sales_1 1647216000000 0
TS.ADD bike_sales_2 1647216000000 0
TS.ADD bike_sales_3 1647216000000 0
TS.ADD bike_sales_4 1647216000000 0
TS.ADD bike_sales_5 1647286841172 1618.29
TS.ADD bike_sales_1 1647279760033 1507.2
TS.ADD bike_sales_1 1647287762269 1695.86
TS.ADD bike_sales_4 1647284250148 1146.33
TS.ADD bike_sales_3 1647284743577 2009.3
TS.ADD bike_sales_1 1647302400000 0
TS.ADD bike_sales_2 1647302400000 0
TS.ADD bike_sales_3 1647302400000 0
TS.ADD bike_sales_4 1647302400000 0
TS.ADD bike_sales_4 1647365310464 1840.15
TS.ADD bike_sales_5 1647373851920 522.78
TS.ADD bike_sales_4 1647371538270 759.14
TS.ADD bike_sales_5 1647367734547 2805.15
TS.ADD bike_sales_1 1647388800000 0
TS.ADD bike_sales_2 1647388800000 0
TS.ADD bike_sales_3 1647388800000 0
TS.ADD bike_sales_4 1647388800000 0
TS.ADD bike_sales_1 1647450557881 2076.08
TS.ADD bike_sales_4 1647458667636 2864.62
TS.ADD bike_sales_5 1647460789178 497.4
TS.ADD bike_sales_1 1647475200000 0
TS.ADD bike_sales_2 1647475200000 0
TS.ADD bike_sales_3 1647475200000 0
TS.ADD bike_sales_4 1647475200000 0
TS.ADD bike_sales_5 1647537492776 1653.44
TS.ADD bike_sales_4 1647544844714 1372.14
TS.ADD bike_sales_4 1647545740916 956.84
TS.ADD bike_sales_1 1647561600000 0
TS.ADD bike_sales_2 1647561600000 0
TS.ADD bike_sales_3 1647561600000 0
TS.ADD bike_sales_4 1647561600000 0
TS.ADD bike_sales_5 1647630804734 144.36
TS.ADD bike_sales_2 1647630620091 2040.06
TS.ADD bike_sales_2 1647630204217 2543.31
TS.ADD bike_sales_2 1647630043614 1135.37
TS.ADD bike_sales_1 1647648000000 0
TS.ADD bike_sales_2 1647648000000 0
TS.ADD bike_sales_3 1647648000000 0
TS.ADD bike_sales_4 1647648000000 0
TS.ADD bike_sales_2 1647708668638 3563.32
TS.ADD bike_sales_1 1647712734784 3124.01
TS.ADD bike_sales_1 1647691193206 3843.6
TS.ADD bike_sales_1 1647689625824 1234.81
TS.ADD bike_sales_5 1647698551229 3974.14
TS.ADD bike_sales_1 1647734400000 0
TS.ADD bike_sales_2 1647734400000 0
TS.ADD bike_sales_3 1647734400000 0
TS.ADD bike_sales_4 1647734400000 0
TS.ADD bike_sales_1 1647820800000 0
TS.ADD bike_sales_2 1647820800000 0
TS.ADD bike_sales_3 1647820800000 0
TS.ADD bike_sales_4 1647820800000 0
TS.ADD bike_sales_4 1647884640286 305.04
TS.ADD bike_sales_1 1647883329149 676.86
TS.ADD bike_sales_5 1647882403272 2754.18
TS.ADD bike_sales_1 1647882578005 2581.71
TS.ADD bike_sales_3 1647884141957 2865.15
TS.ADD bike_sales_1 1647907200000 0
TS.ADD bike_sales_2 1647907200000 0
TS.ADD bike_sales_3 1647907200000 0
TS.ADD bike_sales_4 1647907200000 0
TS.ADD bike_sales_3 1647974981337 421.44
TS.ADD bike_sales_2 1647978020604 1711.07
TS.ADD bike_sales_2 1647977580294 1801.86
TS.ADD bike_sales_1 1647993600000 0
TS.ADD bike_sales_2 1647993600000 0
TS.ADD bike_sales_3 1647993600000 0
TS.ADD bike_sales_4 1647993600000 0
TS.ADD bike_sales_3 1648062372210 500.78
```

The sales data you just loaded contains bike sales, one sale per sample, from  2021-12-31T16:00:00 to 2022-03-23T12:06:12. Data was obtained from each of the five bike shops.

In the next part of this tutorial, you'll learn how to retrieve data using a variety of methods.
