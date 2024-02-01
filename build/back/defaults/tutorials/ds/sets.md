Redis sets are similar to lists, except they are unordered, and each element must be unique. You can use sets to:

- Track unique items (e.g., track all unique IP addresses accessing a given blog post).
- Represent relations (e.g., the set of all users with a specified role).
- Perform common set operations such as intersection, union, and difference.

Here are some important set commands:

- `SADD`
- `SREM`
- `SISMEMBER`
- `SMEMBERS`
- `SUNION`

Use `SADD` to create and update a set. Each `SADD` command will return the number of added members. If you try to add a member that is already in the set, `0` is returned.

```redis:[run_confirmation=true] Create a set
SADD bike:1:addons "whitewall tires"
SADD bike:1:addons "bell" "reflectors"
SADD bike:1:addons "bell"
```

Notice that the `SADD` command is variadic.

`SREM` is used to remove members of a set. It returns `1` if the member is in the set, or `0` if it is not.

```redis:[run_confirmation=true] Remove set members
SREM bike:1:addons "bell"
SREM bike:1:addons "sissy bar"
```

The `SISMEMBER` command is used to test set membership. It returns `1` if the member is present, and `0` otherwise.

```redis Test set membership
SISMEMBER bike:1:addons "reflectors"
SISMEMBER bike:1:addons "sissy bar"
```

Use `SMEMBERS` to return all the members of a set.

```redis Get set members
SMEMBERS bike:1:addons
```

`SUNION` combines two or more sets and returns all their elements.

```redis:[run_confirmation=true] SUNION usage
SADD bike:1:special_addons "sparkle coat finish" "banana seat"
SUNION bike:1:addons bike:1:special_addons
```

Sets have two ways to return one or more random members of a set:

- `SPOP`
- `SRANDMEMBER`

Each command takes a key and, optionally, a count as arguments. `SPOP` removes and returns a random member, whereas `SRANDMEMBER` just returns the randomly selected members without removing them.

```redis:[run_confirmation=true] SPOP/SRANDMEMBER usage
SMEMBERS bike:1:addons
SRANDMEMBER bike:1:addons
SPOP bike:1:addons
SMEMBERS bike:1:addons
```

See [here](https://redis.io/docs/data-types/sets?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials) for the set type reference page, and [here](https://redis.io/commands/?group=set&utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials) for the entire list of Redis set commands.
