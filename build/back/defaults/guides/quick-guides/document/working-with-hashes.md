### CRUD Operations

Reading and managing hashes is done through the `HSET` and `HGET` commands. Let's look at a few examples of working with a document that represents a product with the following structure:

```
school:1
--------
name: Hall School
description: An independent...
class: independent/state
type: traditional/montessori/forest...
address_city: London
address_street: Manor Street
students: 342
location: "51.445417, -0.258352"
```

To begin with, let's create a few documents:

```redis Create
// Each of the documents below represents a school and it will be created as a Redis Hash

HSET school:1 "name" "Hall School" "description" " Spanning 10 states, this school's award-winning curriculum includes a comprehensive reading system (from letter recognition and phonics to reading full-length books), as well as math, science, social studies, and even  philosophy. " "class" "independent" "type" "traditional" "address_city" "London" "address_street" "Manor Street" "students" 342 "location" "51.445417, -0.258352"

HSET school:2 "name" "Garden School" "description" "Garden School is a new and innovative outdoor teaching and learning experience, offering rich and varied activities in a natural environment to children and families." "class" "state" "type" "forest; montessori;" "address_city" "London" "address_street" "Gordon Street" "students" 1452 "location" "51.402926, -0.321523"

HSET school:3 "name" "Gillford School" "description" "Gillford School is an inclusive learning centre welcoming people from all walks of life, here invited to step into their role as regenerative agents, creating new pathways into the future and inciting an international movement of cultural, land, and social transformation." "class" "private" "type" "democratic; waldorf" "address_city" "Goudhurst" "address_street" "Goudhurst" "students" 721 "location" "51.112685, 0.451076"

HSET school:4 "name" "Forest School" "description" "The philosophy behind Forest School is based upon the desire to provide young children with an education that encourages appreciation of the wide world in nature while achieving independence, confidence and high self-esteem. " "class" "independent" "type" "forest; montessori; democratic" "address_city" "Oxford" "address_street" "Trident Street" "students" 1200 "location" "51.781756, -1.123196"

```

<br>


To read what we just wrote we can use the `HGETALL` command (to get the whole document), or we can get a single element by using the `HGET` command:
```redis Read
HGETALL school:1 // Read the whole document

HGET school:1 description // Read the field description only

```

<br>

Updating documents is also possible on a single element level, or if needed, you can replace the whole document atomically, in a single command:
```redis Update
HGET school:1 students // Read the students field before the update

HSET school:1 "students"  343 // Update the students field

HGET school:1 students // Read the students field after the update

```

<br>

The command `HDEL` will delete a single element from a document. To delete a whole document we use the standard key deletion command in Redis - `DEL`. If you need to delete more than a few documents though, please use the asynchronous version `UNLINK`
```redis Delete an element
HGET school:1  name // Read the name field before deletion

HDEL school:1  name // Delete only the name field from the document

HGETALL school:1 // Read the whole document to confirm the name field has been deleted
```

```redis Delete a document
DEL school:1 // Delete the entire document

HGETALL school:1 // Confirm the entire document has been deleted
```

<br>

### Indexing your data
The Redis keyspace is unstructured and flat; by default, you can only access data by its primary key (keyname) making it very difficult to find a document based on a secondary characteristic, for example finding a school by name or listing all schools in a particular city. Redis Stack addresses this need by providing a possibility to index and query your data. 

Let's take a look at a very simple example:


```
FT.CREATE idx:schools  
  ON HASH                
    PREFIX 1 "school:"     
  SCHEMA
    "name" AS street TEXT NOSTEM 
    "students" NUMERIC SORTABLE    
    "address_city" AS city TAG SORTABLE    
```

In the query above we specify that we want to create an index named `idx:schools` that will index all keys of type `HASH` with a prefix of `school:`. The engine will index the fields `name`, `students` and `city`, making it possible to search on them. After we create the index, the indexing will happen automatically and synchronously every time we create or modify a hash with the specified prefix, but the engine will also retroactively index all existing documents in the database that match the specified criteria.

Let's expand this simple example to our use case:
```redis Create a hash index
// Create an index on hash keys prefixed with "school:"
// Note that it is possible to index either every hash or every JSON document in the keyspace or configure indexing only for a subset of the same data type documents described by a prefix.

FT.CREATE idx:schools           // Index name
  ON HASH                       // Indicates the type of data to index
    PREFIX 1 "school:"          // Tells the index which keys it should index
  SCHEMA
    name TEXT NOSTEM SORTABLE   // Will be indexed as a sortable TEXT field. Stemming is disabled, which is ideal for proper names.
    description TEXT
    class TAG                   // Will be indexed as a TAG field. Will allow exact-match queries.
    type TAG SEPARATOR ";"      // For tag fields, a separator indicates how the text contained in the field is to be split into individual tags
    address_city AS city TAG
    address_street AS address TEXT NOSTEM    // 'address_street' field will be indexed as TEXT, without stemming and can be referred to as 'street' due to the '... AS fieldname ...' construct.
    students NUMERIC SORTABLE   // Will be indexed as a numeric field. Will permit sorting during query
    location GEO                // Will be indexed as GEO. Will allow geographic range queries
```


<br>


You can get some additional data about your indices with the `FT.LIST` and `FT.INFO` commands:
```redis Additional index information
FT._LIST // Return a list of all indices

FT.INFO "idx:schools" // Display information about a particular index

```

<br>

### Search and Querying Basics
Now that we instructed Redis Stack on how we want our data indexed we can run different kinds of queries. Let's look at some examples:

#### Text search
You can run full text search queries on any field you marked to be indexed as `TEXT`:

```redis Exact text search
// Perform a text search on all text fields: query for documents in which the word 'nature' occurs

FT.SEARCH idx:schools "nature"
```

```redis Return only certain fields
// Use the RETURN statement followed by the number of fields you want to return and their names 
FT.SEARCH idx:schools "nature" RETURN 2 name description
```

<br>

With Fuzzy search, we can search for words that are similar to the one we're querying for. The number of `%` indicates the allowed Levenshtein distance (number of different characters). So the query would "culture" would match on "cultural" too, because "culture" and "cultural" have a distance of two.
```redis Fuzzy text search
// Perform a Fuzzy text search on all text fields: query for documents with words similar to 'culture' with a Levenshtein distance of 2. 

FT.SEARCH idx:schools "%%culture%%" RETURN 2 name description
```

<br>

You can search on specific fields too:
```redis Field-specific text search
// Perform a text search on a specific field: query for documents that have the word "innovative" in the description

FT.SEARCH idx:schools "@description:innovative"

```

<br>


#### Numeric, tag and geo search
Next, let's look at how we can query on numeric, tag and geo fields:

```redis Numeric range query
// Perform a numeric range query: find all schools with the number of students between 500 and 1000
// To reference a field, use the @<field_name> construct
// For numerical ranges, square brackets are inclusive of the listed values

FT.SEARCH idx:schools "@students:[500,1000]"
```


```redis Tag search
// Perform a tag search: query for documents that have the address_city field set to "Lisbon". 
// Note that we use curly braces around the tag. Also note that even though the field is called address_city in the hash, we can query it as "city". 
// That's because in the schema definition we used the ... AS fieldname ... construct, which allowed us to index "address_city" as "city".

FT.SEARCH idx:schools "@city:{London}"
```

```redis Geo search
// Search for all schools in a radius of 30km of a location with a longitude of 51.3 and latitude of 0.32
FT.SEARCH idx:schools "@location:[51.3 0.32 30 km]"
```

<br>

#### Search with multiple parameters
```redis Multiple tags (OR) search
// Perform a search for documents that have one of multiple tags (OR condition)
FT.SEARCH idx:schools "@type:{forest|democratic}"

```
```redis Multiple tags (AND) search
// Perform a search for documents that have all of the tags (AND condition)
FT.SEARCH idx:schools "@type:{forest} @type:{montessori}"

```
```redis Combined search on two fields (AND)
// Perform a combined search on two fields (AND): query for the intersection of both search terms.
FT.SEARCH idx:schools "@type:{forest} @description:independence"

```
```redis Combined search on two fields (OR)
// Perform a combined search on two fields (OR): query for the union of both search terms. The brackets are important.
FT.SEARCH idx:schools "(@city:{London})|(@description:nature)"

```
```redis Combined search and geo-filter
// Perform a fuzzy text search and filter on location in a radius distance of 30km

FT.SEARCH idx:schools "%%nature%% @location:[51.3 0.32 30 km]"

```

<br>

#### Aggregations
Aggregations are a way to process the results of a search query, group, sort and transform them - and extract analytic insights from them. Much like aggregation queries in other databases and search engines, they can be used to create analytics reports, or perform Faceted Search style queries. 

For example, we can group schools by city and count schools per group, giving us the number of schools per city. Or we could group by school class (independent/state) and see the average number of students per group.
```redis Group by & sort by aggregation: COUNT
// Perform a Group By & Sort By aggregation of your documents: display the number of schools per city and sort by count

FT.AGGREGATE idx:schools "*"
    GROUPBY 1 @city REDUCE COUNT 0 AS schools_per_city
    SORTBY 2 @schools_per_city Asc

```

```redis Group by & sort by aggregation: AVG
// Group by school class and show the average number of students per class.
FT.AGGREGATE idx:schools "*"
    GROUPBY 1 @class REDUCE AVG 1 students AS students_avg
    SORTBY 2 @students_avg Asc
```

<br>

`APPLY` performs a 1-to-1 transformation on one or more properties in each record. It either stores the result as a new property down the pipeline or replaces any property using this transformation. 
```redis Aggregation with the transformation of properties
// Perform an aggregation of your documents with an apply function: list all schools and their distance from a specific location
// Note that you need to enclose the APPLY function within double quotes

FT.AGGREGATE idx:schools "*" 
    LOAD 2 @name @location 
    FILTER "exists(@location)" 
    APPLY "geodistance(@location,51.3, 0.32)" AS dist 
    SORTBY 2 @dist DESC

```
