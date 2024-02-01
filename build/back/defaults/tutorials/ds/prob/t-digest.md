In this tutorial, you'll learn how to use the t-digest data structure in a bike shop use case.

A t-digest provides a mechanism to estimate percentiles from a data stream or large dataset using a compact sketch.
It can answer questions such as:

- Which fraction of the values in the data stream are smaller than a given value?
- How many values in the data stream are smaller than a given value?
- What's the highest value that's smaller than *p* percent of the values in the data stream? That is, what is the *p*-percentile value?

t-digests are created using the `TDIGEST.CREATE` command. This command takes a key name and an optional `COMPRESSION` value, which defaults to `100`.
A full discussion of compression is beyond the scope of this tutorial. See the **Learn More** section below for an academic article that discusses compression in great detail.

Once a t-digest has been created, you can use the `TDIGEST.ADD` command to add observations to it.

```redis:[run_confirmation=true] Create a t-digest
TDIGEST.CREATE bike:sales COMPRESSION 1000 // 1000 provides for very accurate estimations
```

```redis:[run_confirmation=true] Add bike sales data to the t-digest
TDIGEST.ADD bike:sales 0
TDIGEST.ADD bike:sales 1028.24
TDIGEST.ADD bike:sales 1034.63
TDIGEST.ADD bike:sales 1087.93
TDIGEST.ADD bike:sales 1088.78
TDIGEST.ADD bike:sales 1093.82
TDIGEST.ADD bike:sales 1135.37
TDIGEST.ADD bike:sales 1146.33
TDIGEST.ADD bike:sales 1147.99
TDIGEST.ADD bike:sales 1151.2
TDIGEST.ADD bike:sales 1155.28
TDIGEST.ADD bike:sales 1172.82
TDIGEST.ADD bike:sales 1181.07
TDIGEST.ADD bike:sales 1206.48
TDIGEST.ADD bike:sales 1219.61
TDIGEST.ADD bike:sales 1234.81
TDIGEST.ADD bike:sales 1239.53
TDIGEST.ADD bike:sales 1261.35
TDIGEST.ADD bike:sales 1275.97
TDIGEST.ADD bike:sales 1276.34
TDIGEST.ADD bike:sales 1284.55
TDIGEST.ADD bike:sales 1289.01
TDIGEST.ADD bike:sales 1309.74
TDIGEST.ADD bike:sales 1317.87
TDIGEST.ADD bike:sales 1318.97
TDIGEST.ADD bike:sales 1355.34
TDIGEST.ADD bike:sales 1372.14
TDIGEST.ADD bike:sales 1393.12
TDIGEST.ADD bike:sales 1395.69
TDIGEST.ADD bike:sales 141.99
TDIGEST.ADD bike:sales 1435.79
TDIGEST.ADD bike:sales 144.36
TDIGEST.ADD bike:sales 1464.74
TDIGEST.ADD bike:sales 1469.08
TDIGEST.ADD bike:sales 147.98
TDIGEST.ADD bike:sales 1494.88
TDIGEST.ADD bike:sales 1499.2
TDIGEST.ADD bike:sales 1507.2
TDIGEST.ADD bike:sales 1516.66
TDIGEST.ADD bike:sales 1521.42
TDIGEST.ADD bike:sales 1587.48
TDIGEST.ADD bike:sales 1590.98
TDIGEST.ADD bike:sales 1596.35
TDIGEST.ADD bike:sales 1609.0
TDIGEST.ADD bike:sales 1618.29
TDIGEST.ADD bike:sales 1619.03
TDIGEST.ADD bike:sales 1619.09
TDIGEST.ADD bike:sales 1624.51
TDIGEST.ADD bike:sales 1640.86
TDIGEST.ADD bike:sales 1652.79
TDIGEST.ADD bike:sales 1653.44
TDIGEST.ADD bike:sales 1666.23
TDIGEST.ADD bike:sales 1684.47
TDIGEST.ADD bike:sales 1695.86
TDIGEST.ADD bike:sales 1697.72
TDIGEST.ADD bike:sales 1711.07
TDIGEST.ADD bike:sales 1733.52
TDIGEST.ADD bike:sales 1749.9
TDIGEST.ADD bike:sales 1752.62
TDIGEST.ADD bike:sales 1769.37
TDIGEST.ADD bike:sales 1785.55
TDIGEST.ADD bike:sales 1791.65
TDIGEST.ADD bike:sales 1801.86
TDIGEST.ADD bike:sales 1802.61
TDIGEST.ADD bike:sales 1822.93
TDIGEST.ADD bike:sales 1840.15
TDIGEST.ADD bike:sales 1862.83
TDIGEST.ADD bike:sales 1865.0
TDIGEST.ADD bike:sales 1879.4
TDIGEST.ADD bike:sales 1909.59
TDIGEST.ADD bike:sales 1927.15
TDIGEST.ADD bike:sales 1950.88
TDIGEST.ADD bike:sales 1950.91
TDIGEST.ADD bike:sales 1950.95
TDIGEST.ADD bike:sales 1971.25
TDIGEST.ADD bike:sales 1974.42
TDIGEST.ADD bike:sales 1981.45
TDIGEST.ADD bike:sales 1984.7
TDIGEST.ADD bike:sales 1986.63
TDIGEST.ADD bike:sales 2009.3
TDIGEST.ADD bike:sales 202.68
TDIGEST.ADD bike:sales 2031.86
TDIGEST.ADD bike:sales 2040.06
TDIGEST.ADD bike:sales 2051.99
TDIGEST.ADD bike:sales 2065.05
TDIGEST.ADD bike:sales 2070.4
TDIGEST.ADD bike:sales 2076.08
TDIGEST.ADD bike:sales 2098.87
TDIGEST.ADD bike:sales 2113.58
TDIGEST.ADD bike:sales 2120.37
TDIGEST.ADD bike:sales 2127.65
TDIGEST.ADD bike:sales 2131.1
TDIGEST.ADD bike:sales 2148.47
TDIGEST.ADD bike:sales 2195.21
TDIGEST.ADD bike:sales 2204.21
TDIGEST.ADD bike:sales 2205.5
TDIGEST.ADD bike:sales 2214.18
TDIGEST.ADD bike:sales 2225.34
TDIGEST.ADD bike:sales 2226.55
TDIGEST.ADD bike:sales 2249.47
TDIGEST.ADD bike:sales 2254.49
TDIGEST.ADD bike:sales 2257.08
TDIGEST.ADD bike:sales 2262.15
TDIGEST.ADD bike:sales 2262.57
TDIGEST.ADD bike:sales 2289.55
TDIGEST.ADD bike:sales 2289.75
TDIGEST.ADD bike:sales 2301.67
TDIGEST.ADD bike:sales 2325.75
TDIGEST.ADD bike:sales 234.75
TDIGEST.ADD bike:sales 2350.04
TDIGEST.ADD bike:sales 2354.71
TDIGEST.ADD bike:sales 2365.72
TDIGEST.ADD bike:sales 2371.73
TDIGEST.ADD bike:sales 2372.96
TDIGEST.ADD bike:sales 2374.72
TDIGEST.ADD bike:sales 2376.35
TDIGEST.ADD bike:sales 238.17
TDIGEST.ADD bike:sales 2396.72
TDIGEST.ADD bike:sales 2447.65
TDIGEST.ADD bike:sales 2449.07
TDIGEST.ADD bike:sales 245.27
TDIGEST.ADD bike:sales 2460.1
TDIGEST.ADD bike:sales 2479.99
TDIGEST.ADD bike:sales 2528.12
TDIGEST.ADD bike:sales 2535.28
TDIGEST.ADD bike:sales 2543.31
TDIGEST.ADD bike:sales 2559.02
TDIGEST.ADD bike:sales 2581.71
TDIGEST.ADD bike:sales 2597.52
TDIGEST.ADD bike:sales 2602.24
TDIGEST.ADD bike:sales 2611.96
TDIGEST.ADD bike:sales 2614.96
TDIGEST.ADD bike:sales 2619.53
TDIGEST.ADD bike:sales 2636.62
TDIGEST.ADD bike:sales 2655.43
TDIGEST.ADD bike:sales 2660.26
TDIGEST.ADD bike:sales 2671.49
TDIGEST.ADD bike:sales 2695.12
TDIGEST.ADD bike:sales 270.43
TDIGEST.ADD bike:sales 2722.73
TDIGEST.ADD bike:sales 2732.6
TDIGEST.ADD bike:sales 2754.18
TDIGEST.ADD bike:sales 2754.61
TDIGEST.ADD bike:sales 2787.63
TDIGEST.ADD bike:sales 2795.85
TDIGEST.ADD bike:sales 2796.3
TDIGEST.ADD bike:sales 2800.65
TDIGEST.ADD bike:sales 2805.15
TDIGEST.ADD bike:sales 2810.31
TDIGEST.ADD bike:sales 2825.98
TDIGEST.ADD bike:sales 2829.23
TDIGEST.ADD bike:sales 2832.54
TDIGEST.ADD bike:sales 2855.58
TDIGEST.ADD bike:sales 2861.72
TDIGEST.ADD bike:sales 2864.62
TDIGEST.ADD bike:sales 2865.15
TDIGEST.ADD bike:sales 2868.9
TDIGEST.ADD bike:sales 2870.47
TDIGEST.ADD bike:sales 2906.22
TDIGEST.ADD bike:sales 2919.5
TDIGEST.ADD bike:sales 2936.76
TDIGEST.ADD bike:sales 2938.93
TDIGEST.ADD bike:sales 2942.94
TDIGEST.ADD bike:sales 2946.26
TDIGEST.ADD bike:sales 2974.71
TDIGEST.ADD bike:sales 2985.74
TDIGEST.ADD bike:sales 2986.28
TDIGEST.ADD bike:sales 2999.32
TDIGEST.ADD bike:sales 305.04
TDIGEST.ADD bike:sales 3062.72
TDIGEST.ADD bike:sales 3080.67
TDIGEST.ADD bike:sales 3087.52
TDIGEST.ADD bike:sales 3124.01
TDIGEST.ADD bike:sales 3139.33
TDIGEST.ADD bike:sales 3161.07
TDIGEST.ADD bike:sales 3189.64
TDIGEST.ADD bike:sales 3192.7
TDIGEST.ADD bike:sales 326.04
TDIGEST.ADD bike:sales 3336.23
TDIGEST.ADD bike:sales 3337.66
TDIGEST.ADD bike:sales 346.05
TDIGEST.ADD bike:sales 3500.79
TDIGEST.ADD bike:sales 3506.64
TDIGEST.ADD bike:sales 3510.92
TDIGEST.ADD bike:sales 354.1
TDIGEST.ADD bike:sales 3563.32
TDIGEST.ADD bike:sales 3573.39
TDIGEST.ADD bike:sales 3618.76
TDIGEST.ADD bike:sales 3638.42
TDIGEST.ADD bike:sales 364.33
TDIGEST.ADD bike:sales 3653.41
TDIGEST.ADD bike:sales 3654.49
TDIGEST.ADD bike:sales 3658.54
TDIGEST.ADD bike:sales 370.26
TDIGEST.ADD bike:sales 3734.39
TDIGEST.ADD bike:sales 3736.82
TDIGEST.ADD bike:sales 378.39
TDIGEST.ADD bike:sales 3843.6
TDIGEST.ADD bike:sales 3905.58
TDIGEST.ADD bike:sales 3924.99
TDIGEST.ADD bike:sales 3974.14
TDIGEST.ADD bike:sales 3975.63
TDIGEST.ADD bike:sales 4020.62
TDIGEST.ADD bike:sales 403.36
TDIGEST.ADD bike:sales 404.85
TDIGEST.ADD bike:sales 405.28
TDIGEST.ADD bike:sales 4166.95
TDIGEST.ADD bike:sales 4171.72
TDIGEST.ADD bike:sales 4205.09
TDIGEST.ADD bike:sales 421.44
TDIGEST.ADD bike:sales 4231.58
TDIGEST.ADD bike:sales 4238.72
TDIGEST.ADD bike:sales 425.03
TDIGEST.ADD bike:sales 4486.56
TDIGEST.ADD bike:sales 4553.39
TDIGEST.ADD bike:sales 4554.14
TDIGEST.ADD bike:sales 4599.81
TDIGEST.ADD bike:sales 460.03
TDIGEST.ADD bike:sales 4612.71
TDIGEST.ADD bike:sales 4644.86
TDIGEST.ADD bike:sales 470.23
TDIGEST.ADD bike:sales 470.64
TDIGEST.ADD bike:sales 4739.8
TDIGEST.ADD bike:sales 4753.21
TDIGEST.ADD bike:sales 4755.21
TDIGEST.ADD bike:sales 4888.02
TDIGEST.ADD bike:sales 497.4
TDIGEST.ADD bike:sales 500.78
TDIGEST.ADD bike:sales 522.78
TDIGEST.ADD bike:sales 528.19
TDIGEST.ADD bike:sales 530.2
TDIGEST.ADD bike:sales 553.26
TDIGEST.ADD bike:sales 570.97
TDIGEST.ADD bike:sales 582.7
TDIGEST.ADD bike:sales 587.48
TDIGEST.ADD bike:sales 619.62
TDIGEST.ADD bike:sales 663.51
TDIGEST.ADD bike:sales 669.97
TDIGEST.ADD bike:sales 676.86
TDIGEST.ADD bike:sales 685.65
TDIGEST.ADD bike:sales 717.76
TDIGEST.ADD bike:sales 721.44
TDIGEST.ADD bike:sales 759.14
TDIGEST.ADD bike:sales 776.84
TDIGEST.ADD bike:sales 784.85
TDIGEST.ADD bike:sales 784.96
TDIGEST.ADD bike:sales 803.99
TDIGEST.ADD bike:sales 808.3
TDIGEST.ADD bike:sales 825.79
TDIGEST.ADD bike:sales 838.53
TDIGEST.ADD bike:sales 863.63
TDIGEST.ADD bike:sales 908.73
TDIGEST.ADD bike:sales 927.37
TDIGEST.ADD bike:sales 956.84
TDIGEST.ADD bike:sales 985.09
```

Use `TDIGEST.INFO` to retrieve information about your t-digest sketch.

```redis TDIGEST.INFO usage
TDIGEST.INFO bike:sales
```

`TDIGEST.MIN` and `TDIGEST.MAX` return the minimum and maximum values of the t-digest.

```redis TDIGEST.MIN and TDIGEST.MAX usage
TDIGEST.MIN bike:sales
TDIGEST.MAX bike:sales
```

The `TDIGEST.BYRANK` and `TDIGEST.BYREVRANK` commands return, for each input rank, a floating point estimation of the value with that rank.

**Note**:
> For `BYRANK`, when a provided rank is 0, the result is the smallest observation (0 in this example). Similarly, when the rank is equal to the number of observations minus one,  the result is the largest observation. For these two ranks, the results are always accurate; the results for any other rank are estimates. When the rank is equal to or larger than the number of observations, the result is inf. `BYREVRANK` is reversed.

```redis TDIGEST.BYRANK usage
TDIGEST.BYRANK bike:sales 0 254 // there are 255 observations in the t-digest 
```

```redis TDIGEST.BYREVRANK usage
TDIGEST.BYREVRANK bike:sales 0 254
```

`TDIGEST.QUANTILE` allows you to calculate percentiles for your t-digest. For example, to get the 25th, 50th, and 75th percentiles you would run:

```redis TDIGEST.QUANTILE usage
TDIGEST.QUANTILE bike:sales 0.25 0.50 0.75
```

The `TDIGEST.CDF` command retrieves, for each input value, an estimation of the fraction of observations smaller than the given value and half the observations that are equal to the given value. CDF stands for cumulative distribution function. 

```redis TDIGEST.CDF usage
TDIGEST.CDF bike:sales 1000.0 3000.0
```

Calculating the average in a list of values is a common operation. However, sometimes measurements are noisy or contain invalid values. For example, consider an absurd `bike:sales` entry of 999999.0. A common practice is to calculate the average value of all observations ignoring outliers. For example, you might want to calculate the average value between the 20th percentile and the 80th percentile. You can use the `TDIGEST.TRIMMED_MEAN` command to do this:

```redis TDIGEST.TRIMMED_MEAN usage
TDIGEST.ADD bike:sales 999999.0
TDIGEST.TRIMMED_MEAN bike:sales 0.2 0.8
```

There may be occasions when you want to merge two t-digests together. You can use the `TDIGEST.MERGE` command to accomplish this.

Finally, you can reset a t-digest sketch using the `TDIGEST.RESET` command.

## Learn more

[Academic resource](https://www.sciencedirect.com/science/article/pii/S2665963820300403)

[Redis blog post](https://redis.com/blog/t-digest-in-redis-stack/)
