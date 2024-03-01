Here's a query that creates a JSON document describing a single bike.

```redis:[run_confirmation=true] Create a JSON document
JSON.SET bicycle:1 $ '{
    "model": "Jigger",
    "brand": "Velorim",
    "price": 270,
    "type": "Kids bikes",
    "specs": {
        "material": "aluminium",
        "weight": "10"
      },
    "description": "The Jigger is the best ride for the smallest of tikes!",
    "addons": [
        "reflectors",
        "grip tassles"
    ],
    "helmet_included": false
    }'
```

Now retrieve the newly created JSON document.

```redis Retrieve bicycle:1
JSON.GET bicycle:1
```

In the above example, the path, which is root (`$`), is implied. You could also write this command as:

```
JSON.GET bicycle:1 $
```

You can also retrieve parts of documents using JSONPath expressions. JSONPath will be discussed in more detail later in this tutorial, but here are a few examples:

```redis Get the price of bicycle:1
JSON.GET bicycle:1 $.price
```

```redis Get the weight of bicycle:1
JSON.GET bicycle:1 $.specs.weight
```

```redis Get the first addon of bicycle:1
JSON.GET bicycle:1 $.addons[0]
```

You can create multiple documents in a single command using `JSON.MSET`:

```redis:[run_confirmation=true] Add two more documents using JSON.MGET
JSON.MSET "bicycle:2" $ "{\"model\": \"Hillcraft\", \"brand\": \"Bicyk\", \"price\": 1200, \"type\": \"Kids Mountain Bikes\", \"specs\": {\"material\": \"carbon\", \"weight\": \"11\"}, \"description\": \"A light mountain bike for kids.\", \"addons\": [\"reflectors\", \"safety lights\"],\"helmet_included\": false}" "bicycle:3" $ "{\"model\": \"Chook air 5\", \"brand\": \"Nord\", \"price\": 815, \"type\": \"Kids Mountain Bikes\", \"specs\": {\"material\": \"alloy\", \"weight\": \"9.1\"}, \"description\": \"A lighter, more durable mountain bike for six years and older.\", \"addons\": [\"reflectors\", \"safety lights\"],\"helmet_included\": false}"
```

You can retrieve multiple documents or parts of documents in a single command using `JSON.MGET`:

```redis Get bicycle:1 and bicycle:2
JSON.MGET bicycle:1 bicycle:2 $
```

```redis Get the price of all three bicycle documents
JSON.MGET bicycle:1 bicycle:2 bicycle:3 $.price
```

There are two other commands you can use to get information from documents:

```redis Get the length of bicycle:1's description
JSON.STRLEN bicycle:1 $.description
```

```redis Get the type of bicycle:1's helmet_included attribute
JSON.TYPE bicycle:1 $.helmet_included
```

The `JSON.MERGE` can also be used to create new documents. `JSON.MERGE` will be covered in more detail later in this tutorial.
