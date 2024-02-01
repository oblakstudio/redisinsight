Redis provides two commands that operate specifically on JSON objects. A simple document will be used to demonstrate each of the two commands.

```redis:[run_confirmation=true] Create document
JSON.SET doc $ '{"a":1,"b":2,"o":{"c":3,"d":4}}'
```

- `JSON.OBJKEYS` - retrieve the fields of a JSON object.

```redis Get doc's fields
JSON.OBJKEYS doc
```

```redis Get the fields for $.o
JSON.OBJKEYS doc $.o
```

- `JSON.OBJLEN` - get the number of fields of a JSON object.

```redis Get the number of members of the object at the root of document doc
JSON.OBJLEN doc
```

```redis Get the number of members of the $.o object of document doc
JSON.OBJLEN doc $.o
```
