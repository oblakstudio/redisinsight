In this section of the JSONPath tutorial, filter and deep scan expressions will be presented using a set of simple documents.

```redis:[run_confirmation=true] Load documents
JSON.SET lit1 $ 5
JSON.SET lit2 $ '"abc"'
JSON.SET lit3 $ true
JSON.SET lit4 $ null
JSON.SET obj1 $ '{"a":1, "b":2}'
JSON.SET obj2 $ '{"a":[1,2,3,"a","b","c",false,true,["a",1],{"a":1},{"b":null}], "b":5}'
JSON.SET obj3 $ '{"a1":"xx", "b1":"xx", "c1":"yy", "d1":".."}'
JSON.SET arr1 $ [1,2,3]
JSON.SET arr2 $ [[1,2,3],4,5,6]
JSON.SET arrmap $ '[{"a":1}, {"b":2}]'
```

## Deep scan (recursive decent) expressions

Deep scan (recursive descent) is available anywhere a name is required.
All values and sub-arrays of any sub-objects are processed, and then each of their elements are processed recursively.

Here are a few examples:

```redis Deep scan of a nested array document
JSON.GET arr2 $..*
```

```redis Deep scan of a nested object document
JSON.GET obj2 $..*
```

```redis Deep scan of an object's sub-element b
JSON.GET obj2 '$..["b"]'
```

## Filter expressions

Filter expressions provide the ability to retrieve items using a combination of relational and logical operators.
Filter expressions use the following syntax:

`[? filterexpr ]`

where `filterexpr` must evaluate to a boolean value, `true` or `false`.

The `@` operator, used only in filter expressions, represents the current node: an array, object, or scalar value.

Supported relational operators: `<`, `<=`, `==`, `>=`, `>`, `!=`, and `=~`. The last operator is used for regular expression matching, and there are two cases:

1. operands that match a regular expression
1. operands that match a regular expression at a given path

Supported logical operators: `||` and `&&`.

### Relational filter expression examples

```redis Simple relational filter expressions
JSON.GET arr1 '$[?@>1]'
JSON.GET obj2 '$.a[?@=="a"]'
```

```redis More filter expressions (identical results)
JSON.GET obj2 '$.a[?@a==1]'
JSON.GET obj2 '$.a[?@.a==1]'
JSON.GET obj2 '$.a[?@*==1]'
JSON.GET obj2 '$.a[?@.*==1]'
```

Some interesting relational use cases:

```redis Interesting filter expressions
JSON.GET obj2 '$.a[?@==@]' // returns all elements
JSON.GET obj2 '$.a[?@[0]==@[0]]' // returns all elements that are non-empty arrays
JSON.GET obj2 '$.a[?@*==@*]' // returns all elements that are non-empty objects
```

#### Relational use cases using `<`, `<=`, `==`, `!=` `>=`, `>`

All evaluations of operand1 where operand1 and operand2 evaluate to scalar values (number, string, `true`, `false`, or `null`) of the same type and the comparison holds. When there's a mismatch in type, an empty array is returned.

The comparison is arithmetic for numbers and lexicographic for strings. For Booleans, `false` < `true`.

Neither arrays nor objects can be used as operands.

The `!=` operator is effective only when there's a mismatch in either type or value.

```redis Relational filter expressions using <, <=, >=, and >
JSON.GET obj2 '$.a[?@>1]' // [2,3]
JSON.GET obj2 '$.a[?1<@]' // [2,3]
JSON.GET obj2 '$.a[?@>"a"]' // ["b","c"]
JSON.GET obj2 '$.a[?"a"<@]' // ["b","c"]
JSON.GET obj2 '$.a[?@>false]' // [true]
JSON.GET obj2 '$.a[?false<@]' // [true]
JSON.GET obj2 '$.a[?1<=1]' // [1,2,3,"a","b","c",false,true,["a",1],{"a":1},{"b":null}], all values
JSON.GET obj2 '$.a[?@<=@]' // [1,2,3,"a","b","c",false,true], all scalar values
JSON.GET obj2 '$.a[?@<=true]' // [false,true], all Boolean values
JSON.GET obj2 '$.a[?(@<0 || @>=0)]' // [1,2,3], all numeric values
```

```redis Relational filter expressions using ==
JSON.GET obj2 '$.a[?@==1]' // [1]
JSON.GET obj2 '$.a[?1==@]' // [1]
JSON.GET obj2 '$.a[?@=="a"]' // ["a"]
JSON.GET obj2 '$.a[?@==false]' // [false]
JSON.GET obj2 '$.a[?@==@]' // [1,2,3,"a","b","c",false,true,["a",1],{"a":1},{"b":null}], all values
JSON.GET obj2 '$.a[?1==1]' // [1,2,3,"a","b","c",false,true,["a",1],{"a":1},{"b":null}], all values
```

```redis Relational filter expressions using !=
JSON.GET obj2 '$.a[?(1!=@)]' // [2,3,"a","b","c",false,true,["a",1],{"a":1},{"b":null}]
JSON.GET obj2 '$.a[?(@!="a")]' // [1,2,3,"b","c",false,true,["a",1],{"a":1},{"b":null}]
```

#### Relational use cases using regular expression with the `=~` operator

**Note**:
> Redis Stack uses [Rust regular expressions syntax](https://docs.rs/regex/latest/regex/#syntax). Invalid regular expressions are not evaluated.

There are two cases:

1. operands that match a specific regular expression

```redis Regex expressions using direct match
JSON.GET obj2 '$.a[?@ =~ "(?i)"]' // ["a","b","c"]
```

1. operands that match a regular expression at a given path

```redis Regex expressions using match at a specific path
JSON.GET obj3 '$[?@ =~ $.a1]' // ["xx","xx"], matches of the regex "xx"
JSON.GET obj3 '$[?@ =~ $.d1]' // ["xx","xx","yy",".."], matches of the regex ".." (any 2 chars)
```

### Logical filter expression examples using `&&` and `||`

```redis Logical filter expression examples
JSON.GET arr1 '$.*[?(@>1 && @<3)]' // [2], all operands must evaluate to true
JSON.GET arr1 '$.*[?(@<2 || @>2)]' // [1,3], at least one operand must evaluate to true
```

### Filter expression examples involving literals

**Note**:
> Arrays and objects cannot be used as literals.

```redis Filter expression examples involving literals
JSON.GET obj2 '$.a[?@==1]' // "[1]", number literal
JSON.GET obj2 '$.a[?@=="a"]' // "[\"a\"]", string literal
JSON.GET obj2 '$.a[?(@==true)]' // "[true]", Boolean literal
JSON.GET obj2 '$.a[?(@==false)]' // "[false]", Boolean literal
JSON.GET obj2 '$.a[?(@.b==null)]' // "[{\"b\":null}]", nil literal
JSON.GET obj2 '$.a[*].*[?(@==null)]' // "[null]", nil literal
```
