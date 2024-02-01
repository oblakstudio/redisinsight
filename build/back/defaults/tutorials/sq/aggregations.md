An aggregation query allows you to perform the following actions:

- Apply simple mapping functions.
- Group data based on field values.
- Apply aggregation functions on the grouped data.

This article explains the basic usage of the `FT.AGGREGATE` command. For further details, see the [command specification](https://redis.io/commands/ft.aggregate/?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials) and the [aggregations reference documentation](https://redis.io/docs/interact/search-and-query/advanced-concepts/aggregations?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials).

The examples in this article use a schema with the following fields:

| Field name | Field type |
| ---------- | ---------- |
| `condition` | `TAG` |
| `price` | `NUMERIC` |

```redis:[run_confirmation=true] Create the bike shop idx:bicycle
FT.CREATE idx:bicycle                                 // idx:bicycle name
    ON JSON                                           // the type of data to idx:bicycle
        PREFIX 1 bicycle:                             // the prefix of the keys to be idx:bicycleed
    SCHEMA
        $.brand AS brand TEXT WEIGHT 1.0              // idx:bicycle $.brand (brand) as text
        $.model AS model TEXT WEIGHT 1.0              // idx:bicycle $.model (model) as text
        $.description AS description TEXT WEIGHT 1.0  // idx:bicycle $.description (description) as text
        $.price AS price NUMERIC                      // idx:bicycle $.price (price) as numeric
        $.condition AS condition TAG SEPARATOR ,      // idx:bicycle $.condition (condition) as
                                                      //    comma-separated tags
```

```redis:[run_confirmation=true] Load the JSON data
JSON.SET "bicycle:0" "." "{\"brand\": \"Velorim\", \"model\": \"Jigger\", \"price\": 270, \"description\": \"Small and powerful, the Jigger is the best ride for the smallest of tikes! This is the tiniest kids\\u2019 pedal bike on the market available without a coaster brake, the Jigger is the vehicle of choice for the rare tenacious little rider raring to go.\", \"condition\": \"new\"}"
JSON.SET "bicycle:1" "." "{\"brand\": \"Bicyk\", \"model\": \"Hillcraft\", \"price\": 1200, \"description\": \"Kids want to ride with as little weight as possible. Especially on an incline! They may be at the age when a 27.5\\\" wheel bike is just too clumsy coming off a 24\\\" bike. The Hillcraft 26 is just the solution they need!\", \"condition\": \"used\"}"
JSON.SET "bicycle:2" "." "{\"brand\": \"Nord\", \"model\": \"Chook air 5\", \"price\": 815, \"description\": \"The Chook Air 5  gives kids aged six years and older a durable and uberlight mountain bike for their first experience on tracks and easy cruising through forests and fields. The lower  top tube makes it easy to mount and dismount in any situation, giving your kids greater safety on the trails.\", \"condition\": \"used\"}"
JSON.SET "bicycle:3" "." "{\"brand\": \"Eva\", \"model\": \"Eva 291\", \"price\": 3400, \"description\": \"The sister company to Nord, Eva launched in 2005 as the first and only women-dedicated bicycle brand. Designed by women for women, allEva bikes are optimized for the feminine physique using analytics from a body metrics database. If you like 29ers, try the Eva 291. It\\u2019s a brand new bike for 2022.. This full-suspension, cross-country ride has been designed for velocity. The 291 has 100mm of front and rear travel, a superlight aluminum frame and fast-rolling 29-inch wheels. Yippee!\", \"condition\": \"used\"}"
JSON.SET "bicycle:4" "." "{\"brand\": \"Noka Bikes\", \"model\": \"Kahuna\", \"price\": 3200, \"description\": \"Whether you want to try your hand at XC racing or are looking for a lively trail bike that's just as inspiring on the climbs as it is over rougher ground, the Wilder is one heck of a bike built specifically for short women. Both the frames and components have been tweaked to include a women\\u2019s saddle, different bars and unique colourway.\", \"condition\": \"used\"}"
JSON.SET "bicycle:5" "." "{\"brand\": \"Breakout\", \"model\": \"XBN 2.1 Alloy\", \"price\": 810, \"description\": \"The XBN 2.1 Alloy is our entry-level road bike \\u2013 but that\\u2019s not to say that it\\u2019s a basic machine. With an internal weld aluminium frame, a full carbon fork, and the slick-shifting Claris gears from Shimano\\u2019s, this is a bike which doesn\\u2019t break the bank and delivers craved performance.\", \"condition\": \"new\"}"
JSON.SET "bicycle:6" "." "{\"brand\": \"ScramBikes\", \"model\": \"WattBike\", \"price\": 2300, \"description\": \"The WattBike is the best e-bike for people who still feel young at heart. It has a Bafang 1000W mid-drive system and a 48V 17.5AH Samsung Lithium-Ion battery, allowing you to ride for more than 60 miles on one charge. It\\u2019s great for tackling hilly terrain or if you just fancy a more leisurely ride. With three working modes, you can choose between E-bike, assisted bicycle, and normal bike modes.\", \"condition\": \"new\"}"
JSON.SET "bicycle:7" "." "{\"brand\": \"Peaknetic\", \"model\": \"Secto\", \"price\": 430, \"description\": \"If you struggle with stiff fingers or a kinked neck or back after a few minutes on the road, this lightweight, aluminum bike alleviates those issues and allows you to enjoy the ride. From the ergonomic grips to the lumbar-supporting seat position, the Roll Low-Entry offers incredible comfort. The rear-inclined seat tube facilitates stability by allowing you to put a foot on the ground to balance at a stop, and the low step-over frame makes it accessible for all ability and mobility levels. The saddle is very soft, with a wide back to support your hip joints and a cutout in the center to redistribute that pressure. Rim brakes deliver satisfactory braking control, and the wide tires provide a smooth, stable ride on paved roads and gravel. Rack and fender mounts facilitate setting up the Roll Low-Entry as your preferred commuter, and the BMX-like handlebar offers space for mounting a flashlight, bell, or phone holder.\", \"condition\": \"new\"}"
JSON.SET "bicycle:8" "." "{\"brand\": \"nHill\", \"model\": \"Summit\", \"price\": 1200, \"description\": \"This budget mountain bike from nHill performs well both on bike paths and on the trail. The fork with 100mm of travel absorbs rough terrain. Fat Kenda Booster tires give you grip in corners and on wet trails. The Shimano Tourney drivetrain offered enough gears for finding a comfortable pace to ride uphill, and the Tektro hydraulic disc brakes break smoothly. Whether you want an affordable bike that you can take to work, but also take trail in mountains on the weekends or you\\u2019re just after a stable, comfortable ride for the bike path, the Summit gives a good value for money.\", \"condition\": \"new\"}"
JSON.SET "bicycle:9" "." "{\"model\": \"ThrillCycle\", \"brand\": \"BikeShind\", \"price\": 815, \"description\": \"An artsy,  retro-inspired bicycle that\\u2019s as functional as it is pretty: The ThrillCycle steel frame offers a smooth ride. A 9-speed drivetrain has enough gears for coasting in the city, but we wouldn\\u2019t suggest taking it to the mountains. Fenders protect you from mud, and a rear basket lets you transport groceries, flowers and books. The ThrillCycle comes with a limited lifetime warranty, so this little guy will last you long past graduation.\", \"condition\": \"refurbished\"}"
```

## Simple mapping

The `APPLY` clause allows you to apply a simple mapping function to a result set that is returned based on the query expression.

```
FT.AGGREGATE index "query_expr" LOAD n "field_1" .. "field_n" APPLY "function_expr" AS "result_field"
```

Here is a more detailed explanation of the query syntax:

1. **Query expression**: you can use the same query expressions as you would use with the `FT.SEARCH` command. You can substitute `query_expr` with any of the expressions explained in the articles of this [query topic](https://redis.io/docs/interact/search-and-query/query/?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials). Vector search queries are an exception. You can't combine a vector search with an aggregation query.
2. **Loaded fields**: if field values weren't already loaded into the aggregation pipeline, you can force their presence via the `LOAD` clause. This clause takes the number of fields (`n`), followed by the field names (`"field_1" .. "field_n"`).
3. **Mapping function**: this mapping function operates on the field values. A specific field is referenced as `@field_name` within the function expression. The result is returned as `result_field`.

The following example shows you how to calculate a discounted price for new bicycles:

```redis Calculate discounted price
FT.AGGREGATE idx:bicycle "@condition:{new}" LOAD 2 "__key" "price" APPLY "@price - (@price * 0.1)" AS "discounted"
```

**Note**:
> The field `__key` is a built-in field. 

## Grouping with aggregation

The previous example did not group the data. You can group and aggregate data based on one or many criteria in the following way:

```
FT.AGGREGATE index "query_expr" ...  GROUPBY n "field_1" .. "field_n" REDUCE AGG_FUNC m "@field_param_1" .. "@field_param_m" AS "aggregated_result_field"
```

Here is an explanation of the additional constructs:

1. **Grouping**: you can group by one or many fields. Each ordered sequence of field values then defines one group. It's also possible to group by values that resulted from a previous `APPLY ... AS`.
2. **Aggregation**: you must replace `AGG_FUNC` with one of the supported aggregation functions (e.g., `SUM` or `COUNT`). A complete list of functions is available in the [aggregations reference documentation](https://redis.io/docs/interact/search-and-query/advanced-concepts/aggregations?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials). Replace `aggregated_result_field` with a value of your choice.

The following query shows you how to group by the field `condition` and apply a reduction based on the previously derived `price_category`. The expression `@price<1000` causes a bicycle to have the price category `1` if its price is lower than 1000 USD. Otherwise, it has the price category `0`. The output is the number of affordable bicycles grouped by price category.

```redis Aggregate, group by condition, reduce
FT.AGGREGATE idx:bicycle "*" LOAD 1 price APPLY "@price<1000" AS price_category GROUPBY 1 @condition REDUCE SUM 1 "@price_category" AS "num_affordable"
```

**Note**:
> You can also create more complex aggregation pipelines with `FT.AGGREGATE`. Applying multiple reduction functions under one `GROUPBY` clause is possible. In addition, you can also chain groupings and mix in additional mapping steps (e.g., `GROUPBY ... REDUCE ... APPLY ... GROUPBY ... REDUCE`)

## Aggregating without grouping

You can't use an aggregation function outside of a `GROUPBY` clause, but you can construct your pipeline in a way that the aggregation happens on a single group that spans all documents. If your documents don't share a common attribute, you can add it via an extra `APPLY` step.

Here is an example that adds a type attribute `bicycle` to each document before counting all documents with that type:

```redis Aggregation without grouping
FT.AGGREGATE idx:bicycle "*" APPLY "'bicycle'" AS type GROUPBY 1 @type REDUCE COUNT 0 AS num_total
```

## Grouping without aggregation

It's sometimes necessary to group your data without applying a mathematical aggregation function. If you need a grouped list of values, then the `TOLIST` function is helpful.

The following example shows how to group all bicycles by `condition`:

```redis Grouping without aggregation
FT.AGGREGATE idx:bicycle "*" LOAD 1 "__key" GROUPBY 1 "@condition" REDUCE TOLIST 1 "__key" AS bicylces
```
