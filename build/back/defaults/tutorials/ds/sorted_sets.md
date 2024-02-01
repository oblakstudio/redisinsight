Redis sets are unsorted, which limits their usefulness. Sorted sets are similar to sets, except each unique member has an associated score, which provides the mechanism for sorting. Use cases include:

- rate limiters
- game leaderboards

The following example creates a set of bike brands named for famous computer programmers, using their birth year as the score element to sort the set.

```redis:[run_confirmation=true] Create a sorted set
ZADD bike:brands 1940 "Alan Kay"
ZADD bike:brands 1906 "Grace Hopper"
ZADD bike:brands 1953 "Richard Stallman"
ZADD bike:brands 1965 "Yukihiro Matsumoto"
ZADD bike:brands 1916 "Claude Shannon"
ZADD bike:brands 1969 "Linus Torvalds"
ZADD bike:brands 1957 "Sophie Wilson"
ZADD bike:brands 1912 "Alan Turing"
```

Now you can use the `ZRANGE` command to retrieve members in the order of birth year using member ranks as the arguments. As with lists, you can use `-1`, `-2`, etc., to represent the last, second to last, etc., members.

```redis ZRANGE usage
ZRANGE bike:brands 2 4
```

To delete members from a sorted set, use the `ZREM` command.

```redis:[run_confirmation=true] Remove the Alan Turing model and score
ZREM bike:brands "Alan Turing"
```

Once all the members of a sorted set have been removed, the set's key will also be removed.

To list all the members in score order, use the `ZRANGEBYSCORE`. If you pass the `WITHSCORES` argument, each member's score will also be listed.

```redis List members ordered by score
ZRANGEBYSCORE bike:brands -inf +inf WITHSCORES
```

Note the use of `-inf` and `+inf` in the previous example. This is useful when you don't readily know the score range or particular values. See the manual page for `ZRANGEBYSCORE` for more options.

You can get the rank of any sorted set member using the `ZRANK` command. Note: the member with the lowest score has rank `0`.

```redis Get a bike brand's rank
ZRANK bike:brands "Claude Shannon" WITHSCORE
```

See [here](https://redis.io/docs/data-types/sorted-sets?utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials) for the sorted set type reference page, and [here](https://redis.io/commands/?group=sorted-set&utm_source=redisinsight&utm_medium=main&utm_campaign=tutorials) for the entire list of Redis sorted set commands.
