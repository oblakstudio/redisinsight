### Using JSON for modelling data in Redis

Reading and managing JSON documents is done through the `JSON.SET` and `JSON.GET` commands. In the rest of the guide we'll work with JSON documents with the following structure;

```
{	
    "name": "Garden School",
    "description": "Garden School...    ",
    "class": "state",
    "type": ["forest", "montessori"],
    "address": {
        "city": "London",
        "street": "Gordon Street"
    },
    "students": 1452,
    "location": "51.402926, -0.321523",
    "status_log": ["new", "operating"]
}
```

The model is very similar to the Hash example on the previous page, but here we're using the extra capabilities that JSON provides us. For example, we can group the `address_street` and `address_field` into an object called `address` with properties `street` and `city`. 

To store multiple values in the type field we don't need to rely on a string delimiter anymore, we can instead use an array and manage every member of it separately with JSONPath syntax. This gives us a lot more freedom to model our physical data as close as possible to the logical model.

Another very important advantage of JSON over Hashes for storing documents is that we can read and write specific fields without the need to pull the whole key out of Redis and deserialise it. Updates on elements inside of the JSON are atomic; for example, to increase the number of students we can run `JSON.INCR` without the need to read what's the current value, which is not the case with hashes. 

<br>

### CRUD Operations

To begin with, let's create a few documents:
```redis Create
// Let's add four documents as JSON to the index. Note the format of the key names.
// Each document represents a school.

JSON.SET school_json:1 $ '{"name":"Hall School","description":"Spanning 10 states, this school award-winning curriculum includes a comprehensive reading system (from letter recognition and phonics to reading full-length books), as well as math, science, social studies, and even  philosophy.","class":"independent","type":["traditional"],"address":{"city":"London","street":"Manor Street"},"students":342,"location":"51.445417, -0.258352","status_log":["new","operating"]}'

JSON.SET school_json:2 $ '{"name":"Garden School","description":"Garden School is a new and innovative outdoor teaching and learning experience, offering rich and varied activities in a natural environment to children and families.","class":"state","type":["forest","montessori"],"address":{"city":"London","street":"Gordon Street"},"students":1452,"location":"51.402926, -0.321523","status_log":["new","operating"]}'

JSON.SET school_json:3 $ '{"name":"Gillford School","description":"Gillford School is an inclusive learning centre welcoming people from all walks of life, here invited to step into their role as regenerative agents, creating new pathways into the future and inciting an international movement of cultural, land, and social transformation.","class":"private","type":["democratic","waldorf"],"address":{"city":"Goudhurst","street":"Goudhurst"},"students":721,"location":"51.112685, 0.451076","status_log":["new","operating","closed"]}'

JSON.SET school_json:4 $ '{"name":"Forest School","description":"The philosophy behind Forest School is based upon the desire to provide young children with an education that encourages appreciation of the wide world in nature while achieving independence, confidence and high self-esteem. ","class":"independent","type":["forest","montessori","democratic"],"address":{"city":"Oxford","street":"Trident Street"},"students":1200,"location":"51.781756, -1.123196","status_log":["new","operating"]}'
```

<br>

To read what we just wrote we can use the command `JSON.GET`. And with JSONPath we can specify which parts of the document we want by using the $.<field_name> construct:
```redis Read a full document
JSON.GET school_json:1 $ // Read the whole document
```

```redis Read a single property
JSON.GET school_json:1 $.description // Read only the field description
```

```redis Read a nested property
JSON.GET school_json:1 $.address.city // Read the nested field address -> city
```

```redis Read an element from an array
JSON.GET school_json:1 $.status_log[0] // Get the first element of an array
JSON.GET school_json:1 $.status_log[-1] // Get the last element of an array
```

<br>

Updating documents is done atomically on a level of a single element or on a global document level:
```redis Update
JSON.GET school_json:1 $.students // Read the students field before the update

JSON.SET school_json:1 $.students 343 // Update the students field

JSON.GET school_json:1 $.students // Read the students field after the update

```

<br>

The command `JSON.DEL` can delete a single element from a document or the whole document itself: 

```redis Delete an element
JSON.GET school_json:1 $.students // Read the students field before deletion

JSON.DEL school_json:1 $.students // Delete only the students field from the document

JSON.GET school_json:1  // Read the whole document to confirm the construction_value field has been deleted

JSON.DEL school_json:1  // Delete the entire document

JSON.GET school_json:1 // Confirm the entire document has been deleted

```


<br>

### Indexing your data

The Redis keyspace is unstructured and flat; by default, you can only access data by its primary key (keyname) making it very difficult to find a document based on a secondary characteristic, for example finding a school by name or listing all schools in a particular city. Redis Stack addresses this need by providing a possibility to index and query your data. 

Let's take a look at a very simple example:


```
FT.CREATE idx:schools_json  
  ON JSON
    PREFIX 1 "school_json:"
  SCHEMA
    $.name AS name TEXT NOSTEM 
    $.students AS students NUMERIC SORTABLE
    $.address.city AS city TAG
```

In the query above we specify that we want to create an index named `idx:schools_json` that will index all keys of type `JSON` with a prefix of `schools_json:`. The fields to which we point to with JSONPath (`$.name`, `$.students` and `$address.city`) are going to be indexed by the engine, making it possible to search on them. After we create the index, the indexing will happen automatically and synchronously every time we create or modify a hash with the specified prefix, but the engine will also retroactively index all existing documents in the database that match the specified criteria.


A few rules around indexing JSON documents:
- It is possible to index either every JSON document in the keyspace or configure indexing only for a subset of the same data type documents described by a prefix.
- RedisJSON supports JSONPath, so we can easily access and index nested properties and array elements.
- You cannot index values that contain JSON objects or JSON arrays. To be indexed, a JSONPath expression must return a single scalar value (string or number). If the JSONPath expression returns an object or an array, it will be ignored.
- JSON Strings can only be indexed as TEXT, TAG and GEO (using the right syntax).
- JSON numbers can only be indexed as NUMERIC.
- Boolean and NULL values are ignored.
 

Let's expand this simple example to our use case:

```redis Create a JSON index
// Create an index on JSON keys prefixed with "school_json:"

FT.CREATE idx:schools_json               // Index name
  ON JSON                       // Indicates the type of data to index
    PREFIX 1 "school_json:"     // Tells the index which keys it should index
  SCHEMA
    $.name AS name TEXT NOSTEM SORTABLE     // Will be indexed as a sortable TEXT field. Stemming is disabled - which is ideal for proper names.
    $.description AS description TEXT
    $.class AS class TAG        // Will be indexed as a tag. Will allow exact-match queries.
    $.type[*] AS type TAG          // For tag fields, a separator indicates how the text contained in the field is to be split into individual tags
    $.address.city AS city TAG
    $.address.street AS address TEXT NOSTEM // '$.address.street' field will be indexed as TEXT and can be referred as 'street' due to the '... AS fieldname ...' construct.
    $.students AS students NUMERIC SORTABLE // Will be indexed as a numeric field. Will permit sorting during query
    $.location AS location GEO  // Will be indexed as GEO. Will allow geographic range queries
    $.status_log.[-1] as status TAG // Will index the last element of the array as "status"
```

<br>

You can get some additional data about your indices with the `FT.LIST` and `FT.INFO` commands:
```redis Additional index information
FT._LIST // Return a list of all indices

FT.INFO "idx:schools_json" // Display information about a particular index
```

### Search and Querying Basics

Now that we instructed Redis Stack on how we want our data indexed we can run different kinds of queries. Let's look at some examples:

#### Text search
You can run full-text search queries on any field you marked to be indexed as `TEXT`:

```redis Exact text search
// Perform a text search on all text fields: query for documents in which the word 'nature' occurs

FT.SEARCH idx:schools_json "nature"
```

```redis Return only certain fields
// Use the RETURN statement followed by the number of fields you want to return and their names 
FT.SEARCH idx:schools_json "nature" RETURN 2 name description
```

<br>

With Fuzzy search, we can search for words that are similar to the one we're querying for. The number of `%` indicates the allowed Levenshtein distance (number of different characters). So the query would "culture" would match on "cultural" too, because "culture" and "cultural" have a distance of two.
```redis Fuzzy text search
// Perform a Fuzzy text search on all text fields: query for documents with words similar to 'culture' with a Levenshtein distance of 2. 

FT.SEARCH idx:schools_json "%%culture%%" RETURN 2 name description
```

<br>

You can search on specific fields too:
```redis Field-specific text search
// Perform a text search on a specific field: query for documents that have the word "innovative" in the description

FT.SEARCH idx:schools_json "@description:innovative" RETURN 2 name description
```

<br>

#### Numeric, tag and geo search
Next, let's look at how we can query on numeric, tag and geo fields:

```redis Numeric range query
// Perform a numeric range query: find all schools with the number of students between 500 and 1000
// To reference a field, use the @<field_name> construct
// For numerical ranges, square brackets are inclusive of the listed values

FT.SEARCH idx:schools_json "@students:[500,1000]" RETURN 2 name students
```

```redis Tag search
// Perform a tag search: query for documents that have the address_city field set to "Lisbon". 
// Note that we use curly braces around the tag. Also note that even though the field is called address_city in the hash, we can query it as "city". 
// That's because in the schema definition we used the ... AS fieldname ... construct, which allowed us to index "address_city" as "city".

FT.SEARCH idx:schools_json "@city:{London}" RETURN 2 name city
```

```redis Geo search
// Search for all schools in a radius of 30km of a location with a longitude of 51.3 and latitude of 0.32
FT.SEARCH idx:schools_json "@location:[51.3 0.32 30 km]" RETURN 2 name location
```

<br>

#### Search with multiple parameters
```redis Multiple tags (OR) search
// Perform a search for documents that have one of multiple tags (OR condition)
FT.SEARCH idx:schools_json "@type:{forest|democratic}"

```
```redis Multiple tags (AND) search
// Perform a search for documents that have all of the tags (AND condition)
FT.SEARCH idx:schools_json "@type:{forest} @type:{montessori}"

```
```redis Combined search on two fields (AND)
// Perform a combined search on two fields (AND): query for the intersection of both search terms.
FT.SEARCH idx:schools_json "@type:{forest} @description:independence"

```
```redis Combined search on two fields (OR)
// Perform a combined search on two fields (OR): query for the union of both search terms. The brackets are important.
FT.SEARCH idx:schools_json "(@city:{London})|(@description:nature)"

```
```redis Combined search and geo-filter
// Perform a fuzzy text search and filter on location in a radius distance of 30km

FT.SEARCH idx:schools_json "%%nature%% @location:[51.3 0.32 30 km]"

```

<br>

#### Aggregations
Aggregations are a way to process the results of a search query, group, sort and transform them - and extract analytic insights from them. Much like aggregation queries in other databases and search engines, they can be used to create analytics reports, or perform Faceted Search style queries. 

For example, we can group schools by city and count schools per group, giving us the number of schools per city. Or we could group by school class (independent/state) and see the average number of students per group.
```redis Group by & sort by aggregation: COUNT
// Perform a Group By & Sort By aggregation of your documents: display the number of schools per city and sort by count

FT.AGGREGATE idx:schools_json "*"
    GROUPBY 1 @city REDUCE COUNT 0 AS schools_per_city
    SORTBY 2 @schools_per_city Asc

```

```redis Group by & sort by aggregation: AVG
// Group by school class and show the average number of students per class.
FT.AGGREGATE idx:schools_json "*"
    GROUPBY 1 @class REDUCE AVG 1 students AS students_avg
    SORTBY 2 @students_avg Asc
```

<br>

`APPLY` performs a 1-to-1 transformation on one or more properties in each record. It either stores the result as a new property down the pipeline or replaces any property using this transformation. 
```redis Aggregation with the transformation of properties
// Perform an aggregation of your documents with an apply function: list all schools and their distance from a specific location
// Note that you need to enclose the APPLY function within double quotes

FT.AGGREGATE idx:schools_json "*" 
    LOAD 2 @name @location 
    FILTER "exists(@location)" 
    APPLY "geodistance(@location,51.3, 0.32)" AS dist 
    SORTBY 2 @dist DESC

```
