Modifying JSON documents is straightforward using a combination of JSONPath expressions and Redis's JSON command set.

Here are some examples.

## Extend documents

```redis:[run_confirmation=true] Add a new name-value pair to an existing document
JSON.SET bicycle:1 $.newmember '"value"'
```

You could also use `JSON.MSET` to create or update multiple documents at the same time. First, delete `$.newmember` from `bicycle:1` using `JSON.DEL`.

```redis:[run_confirmation=true] Delete $.newmember from bicycle:1
JSON.DEL bicycle:1 $.newmember
```

Next, add `$.newmember` to all three bicycles:

```redis:[run_confirmation=true] Add a member named newmember too all three bicycles using JSON.MSET
JSON.MSET bicycle:1 $.newmember '"value1"' bicycle:2 $.newmember '"value2"' bicycle:3 $.newmember '"value3"'
JSON.MGET bicycle:1 bicycle:2 bicycle:3 $.newmember
```

## Manipulate numeric values

The `JSON.NUMINCRBY` command allows you to perform arithmetic operations on numeric fields of documents.
Use positive numbers to increment and negative numbers to decrement.

```redis:[run_confirmation=true] Decrease the price of bicycle:1
JSON.GET bicycle:1 $.price
JSON.NUMINCRBY bicycle:1 $.price -10
JSON.GET bicycle:1 $.price
```
## Manipulate string and boolean values

Appending information to JSON strings is straightforward.

```redis:[run_confirmation=true] Append a string bicycle:1's model
JSON.STRAPPEND bicycle:1 $.model '"naut"'
JSON.GET bicycle:1 $.model
```

The `JSON.TOGGLE` command can be used to toggle boolean values.

```redis:[run_confirmation=true] Toggle the value of bicycle:1's helmet_included value
JSON.GET bicycle:1 $.helmet_included
JSON.TOGGLE bicycle:1 $.helmet_included
JSON.GET bicycle:1 $.helmet_included
```

## Deeper document manipulation

As you saw earlier, the `JSON.MERGE` command can be used to create new documents. Additionally, it can also be used for the following use cases:

- Create a non-existant path-value:

```redis:[run_confirmation=true] Add a new name-value pair to bicycle:1
JSON.MERGE bicycle:1 $.newmember2 '"value 2 1"'
JSON.GET bicycle:1
```

- Replace an existing value:

```redis:[run_confirmation=true] Change bicycle:1's model back to Jigger
JSON.MERGE bicycle:1 $.model '"Jigger"'
JSON.GET bicycle:1 $.model
```

- Delete an existing value:

```redis:[run_confirmation=true] Delete newmember2 from bicycle:1
JSON.MERGE bicycle:1 $ '{"newmember2": null}'
JSON.GET bicycle:1
```

- Replace an array:

```redis:[run_confirmation=true] Replace bicycle:1's addons
JSON.MERGE bicycle:1 $.addons '["reflectors", "rainbow seat"]'
JSON.GET bicycle:1 $.addons
```

- Make changes to multiple paths (no example).

## Delete information

You can delete name-value pairs using the `JSON.DEL` or `JSON.FORGET` commands:

```redis:[run_confirmation=true] Delete newmember from bicycle:1
JSON.DEL bicycle:1 $.newmember
JSON.GET bicycle:1
```

The `JSON.CLEAR` command will empty all arrays and set all numeric values to zero. A simple example will illustrate how this works.

```redis:[run_confirmation=true] JSON.CLEAR usage
JSON.SET doc $ '{"obj":{"a":1, "b":2}, "arr":[1,2,3], "str": "foo", "bool": true, "int": 42, "float": 3.14}'
JSON.CLEAR doc $.*
JSON.GET doc $
```

As with all Redis keys, you can use the `DEL` command to delete keys entirely.
