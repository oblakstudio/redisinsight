A Redis list is a data type that contains a series of ordered string values. Use cases include

- implementing stacks (LIFO data structures)
- implementing queues (FIFO data structures)
- implementing producer-consumer patterns

You interact with lists using commands such as:

- RPUSH - adds items to the end of a list.
- LPUSH - adds items to the beginning of a list.
- LLEN - retrieves the length of a list.
- LRANGE - retrieves list items from a specified range.
- LPOP - removes and returns an item from the beginning of a list.
- RPOP - removes and returns an item from the end of a list.

You can begin using with a list without first creating its key, simply by adding values to the key. This works as long as the key doesn't already exist as a different type.

**Note**:
> This is generally true for every Redis data structure, though there are a few exceptions.

If a key's values are removed entirely, the key will be removed from the keyspace.

In the following example, a list key is created and then a second element is added to it using the `RPUSH` command. The length of the list is returned after each command.

```redis:[run_confirmation=true] Create a list with two elements
RPUSH bike:colors "Blue"
RPUSH bike:colors "White"
```

Next, an element is added to the beginning of the list.

```redis:[run_confirmation=true] Prepend a new element
LPUSH bike:colors "Red"
```

When creating a list, there's a shortcut to the above examples. Both `LPUSH` and `RPUSH` accept a variable number of arguments (variadic), so you can create the entire list with a single command. The number of added elements is returned.

```redis:[run_confirmation=true] Add multiple elements
DEL bike:colors
RPUSH bike:colors "Red" "Blue" "White" "Yellow"
```

The `LRANGE` command returns a subset of a key's elements. You provide two arguments in addition to the key name:

1. the index of the first element; note Redis lists use zero-based indexes
2. the index of the last element

For (2), a value of `-1` means the last element in the list; `-2` means the penultimate (second to last) element, and so on.

To return the entire list use `LRANGE keyname 0 -1`.

```redis LRANGE usage
LRANGE bike:colors 0 -1
LRANGE bike:colors 1 2
LRANGE bike:colors 1 -2
```

To retrieve the number of elements in a list, use the `LLEN` command.

```redis LLEN usage
LLEN bike:colors
```

The `LPOP` and `RPOP` commands will remove and return one or more elements from the beginning or end of a list, respectively.

In this next example, you will remove a single element from the beginning of the list, then a single element from the end of the list, and, finally, the remaining items using a `count` argument.

```redis:[run_confirmation=true] LPOP/RPOP usage
LPOP bike:colors
LRANGE bike:colors 0 -1
RPOP bike:colors
LRANGE bike:colors 0 -1
LPOP bike:colors 2
LRANGE bike:colors 0 -1
KEYS bike:colors
```

**Note**:
> `LRANGE` will return an empty (null) list if a key no longer exists.

See [here](https://redis.io/docs/data-types/list?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials) for the list type reference page, and [here](https://redis.io/commands/?group=list&utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials) for the entire set of Redis list commands.
