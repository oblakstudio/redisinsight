A full-text search finds words or phrases within larger texts. You can search within a specific text field or across all text fields. 

This article provides a good overview of the most relevant full-text search capabilities. Please find further details about all the full-text search features in the [reference documentation](https://redis.io/docs/interact/search-and-query/advanced-concepts/?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials).

The examples in this article use a schema with the following fields:

| Field name | Field type |
| ---------- | ---------- |
| `brand`      | `TEXT`       |
| `model`      | `TEXT`       |
| `description`| `TEXT`       |

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

## Single word

To search for a word (or word stem) across all text fields, you can construct the following simple query:

```
FT.SEARCH index "word"
```

Instead of searching across all text fields, you might want to limit the search to a specific text field.

```
FT.SEARCH index "@field: word"
```

Words that occur very often in natural language, such as `the` or `a` for the English language, aren't indexed and will not return a search result. You can find further details in the [stop words article](https://redis.io/docs/interact/search-and-query/advanced-concepts/stopwords?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials).

The following example searches for all bicycles that have the word 'kids' in the description:

```redis Full text, single word search
FT.SEARCH idx:bicycle "@description: kids"
```

## Phrase

A phrase is a sentence, sentence fragment, or small group of words. You can find further details about how to find exact phrases in the [exact match article](https://redis.io/docs/interact/search-and-query/query/exact-match?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials).


## Word prefix

You can also search for words that match a given prefix.

```
FT.SEARCH index "prefix*"
```

```
FT.SEARCH index "@field: prefix*"
```

**Note**:
> The prefix needs to be at least two characters long.

Here is an example that shows you how to search for bicycles with a brand that starts with 'ka':

```redis Word prefix search
FT.SEARCH idx:bicycle "@model: ka*"
```

## Word suffix

Similar to the prefix, it is also possible to search for words that share the same suffix.

```
FT.SEARCH index "*suffix"
```

You can also combine prefix- and suffix-based searches within a query expression.

```
FT.SEARCH index "*infix*"
```

Here is an example that finds all brands that end with 'bikes':

```redis Word suffix search
FT.SEARCH idx:bicycle "@brand:*bikes"
```

## Fuzzy search

A fuzzy search allows you to find documents with words that approximately match your search term. To perform a fuzzy search, you wrap search terms with pairs of `%` characters. A single pair represents a (Levenshtein) distance of one, two pairs represent a distance of two, and three pairs, the maximum distance, represents a distance of three.

Here is the command that searches across all text fields with a distance of one:

```
FT.SEARCH index "%word%"
```

The following example finds all documents that contain a word that has a distance of one to the incorrectly spelled word 'optamized'. You can see that this matches the word 'optimized'.

```redis Fuzzy search with distance=1
FT.SEARCH idx:bicycle "%optamized%"
```

If you want to increase the maximum word distance to two, you can use the following query:

```redis Fuzzy search with distance=2
FT.SEARCH idx:bicycle "%%optamised%%"
```
