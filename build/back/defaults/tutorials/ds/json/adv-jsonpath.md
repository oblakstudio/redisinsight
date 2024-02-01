[JSONPath](https://goessner.net/articles/JsonPath/) expressions help you access specific elements within a JSON document, which is similar to how XPATH works for XML documents.
JSONPath support was added to Redis Stack in version 2.0.
Before that, [a legacy form of pathing](https://redis.io/docs/data-types/json/path/#legacy-path-syntax) was supported.
Only JSONPath will be discussed in this tutorial.

You've already seen several examples of JSONPath in previous parts of this tutorial. The next sections will describe JSONPath in more complete detail.
Some simple JSON documents will be used to demonstrate JSONPath's features.

```redis:[run_confirmation=true] Load documents
JSON.SET lit1 $ 5
JSON.SET lit2 $ '"abc"'
JSON.SET lit3 $ true
JSON.SET lit4 $ null
JSON.SET obj1 $ '{"a":1, "b":2}'
JSON.SET obj2 $ '{"a":[1,2,3,"a","b","c",false,true,["a",1],{"a":1},{"b":null}], "b":5}'
JSON.SET arr1 $ [1,2,3]
JSON.SET arrmap $ '[{"a":1}, {"b":2}]'
```

**Note**:
>A JSONPath query can resolve to multiple absolute path matches. When more than one matching path is identified, the JSON commands apply the operation to every possible path.

## JSONPath syntax

| Syntax&nbsp;element | Description |
|----------------|-------------|
| `$` | The root (outermost JSON element), starts the path. |
| `.` | Selects a child element. |
| `..` | Recursively descends through the JSON document. |
| `*` | If current node is an array, `*` resolves to all array elements. If current node is an object, `*` resolves to all the object's members |
| `[]` | Subscript operator, accesses an array element. |
| `[,]` | Union, selects multiple elements. |
| `[start:end:step]` | Array slice where `start`, `end`, and `step` are indexes. |
| `[?(...)]` | Filters a JSON object or array. Supports comparison operators (`==`, `!=`, `<`, `<=`, `>`, `>=`, `=~`), logical operators (`&&`, `\|\|`), and parentheses for grouping (`(`, `)`). |
| `@` | The current element, used in filter or script expressions. |

## Basic usage

`$` represents the root of a document. When `$` is combined with `.` and/or `[]`, a child element is selected. Here are a few examples.

```redis $ by itself
JSON.GET obj1 $ // returns the entire obj1 document
```

```redis Select an element with $.
JSON.GET obj2 $.a // returns the array pointed to by a
```

```redis Select an element with $[...]
JSON.GET arr1 $[1] // returns the second element of the arr1 array
```

```redis Select $.a using $.[] notation
JSON.GET obj2 '$.["a"]' // note the use of single quotes in this expression; they're needed to be able to use double quotes in the expression
```

It is possible to use `$` as part of a field name.

```redis:[run_confirmation=true] Using $ as part of a field name
JSON.SET d $ '{"$":5, "$$":6}'
JSON.GET d $.$ // returns "[5]"
```

The use of quotes is optional when double quotes are not in use inside of an expression.
Each of the following JSONPath expressions return the same value, `"[5]"`.

```redis Quote usage
JSON.GET obj2 $.b
JSON.GET obj2 $.'b'
JSON.GET obj2 $'.b'
```

**Note**:
>If the current node is not an object or has no member named after the operand, an empty array is returned.

```redis Invalid path
JSON.GET obj1 $.c // "[]" is returned
```

```redis Combining . and []
JSON.GET arrmap $[0].a
```

## Bracket (union) expressions

The following syntaxes are supported:

- `'$["value1", "value2", ...]'`
- `$[idx1, idx2, idx3, ...]`

Each represents a union operation, allowing you to select multiple elements.

For objects, return values are as follows:

- If the current node is an object, an array containing the values of the object’s fields, based on their names, is returned.
- If the current node is an object and has no members named in the bracket expression, it is skipped.
This could result in an empty array being returned.
- If the current node is not an object, an empty array is returned.

Here are some examples:

```redis Bracket union examples with objects
JSON.GET obj1 '$["a"]'
JSON.GET obj1 '$["b","b"]'
JSON.GET obj1 '$["a","c","b","d"]'
JSON.GET obj1 '$["c","d"]'
JSON.GET arr1 '$["a","b"]'
```

For arrays:

- idx must be an integer
- if idx < 0, it is replaced with min(0, idx + array-length)
- if idx ≥ array-length (after normalization) - it is skipped

Return values are as follows:

- If the current node is an array, an array containing elements based on one or more 0-based indexes is returned.
- If the current node is not an array, it is skipped, possibly resulting in an empty array being returned.

idx must be an integer
if idx < 0, it is replaced with min(0, idx + array-length)
if idx ≥ array-length (after normalization) - it is skipped

```redis Bracket union examples with arrays
JSON.GET obj2 $.a[0]
JSON.GET obj2 $.a[-1]
JSON.GET obj2 $.a[100]
JSON.GET obj2 $.a[-100]
JSON.GET obj2 $.a[8][1]
JSON.GET obj2 $.a[0,0,1,1]
JSON.GET obj2 $.b[0]
JSON.GET obj2 $.*[0]
```

Redis Stack also supports slice syntax for arrays: `[start:`end`:`step`]`, where `start`, `end`, and `step` are indexes.
If the current node is an array, an array containing elements extracted from an array are returned, based on a `start` index, an `end` index, and a `step` index.
Array indexes are zero-based; the first element is index 0. Start Index is inclusive; End index is not inclusive.
The following rules apply:

| Predicate | Rule |
| --------- | ---- |
| If `start` is specified | it must be an integer |
| if `start` is omitted | it is replaced with 0 |
| if `start` < 0 | it is replaced with min(0, `start` + array-length) |
| if `start` > array-length | an empty array is returned |
| if `end` is specified | it must be an integer |
| If `end` is omitted | it is replaced with array-length |
| If `end` ≥ array-length | it is replaced with array-length |
| if `end` < 0 | it is replaced with min(0, `end` + array-length) |
| If `end` ≤ `start` (after normalization) | an empty array is returned |
| If `step` is specified | it must be a positive integer |
| If `step` is omitted | it is replaced with 1 |
| If the current node in not an array | an empty array is returned |

```redis Array slice examples
JSON.GET arr1 $[:]
JSON.GET arr1 $[::]
JSON.GET arr1 $[::2]
JSON.GET arr1 $[0:1]
JSON.GET arr1 $[0:2]
JSON.GET lit3 $.*[:]
```

## Wildcard expressions

The `*` character is a wildcard that expands depending on the type of the current node:

- If the current node is an array, an array containing the values of all the array’s elements is returned.

```redis Using * when the current node is an array
JSON.GET arr1 $.*  // each of the following commands return identical results
JSON.GET arr1 $[*]
JSON.GET arr1 $.[*]
```

- If the current node is an object, an array containing the values of all the object’s members is returned.

```redis Using * when the current node is an object
JSON.GET obj1 $.* // each of the following commands return identical results
JSON.GET obj1 $[*]
JSON.GET obj1 $.[*]
```

- If current node is a literal, an empty array is returned.

```redis Using * when the current node is a literal
JSON.GET lit1 $.*
```
