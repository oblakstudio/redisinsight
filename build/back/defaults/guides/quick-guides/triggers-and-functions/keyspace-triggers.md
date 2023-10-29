Functions within Redis can respond to events using keyspace triggers. While the majority of these events are initiated by command invocations, they also include events that occur when a key expires or is removed from the database.

For the full list of supported events, see the [Redis Key Space notifications page](https://redis.io/docs/manual/keyspace-notifications/#events-generated-by-different-commands/?utm_source=redis\&utm_medium=app\&utm_campaign=redisinsight_triggers_and_functions_guide).

The following code creates a new key space trigger that adds a new field to a hash with the latest update time. 

Load the code in your database:

```redis Load keyspace example
TFUNCTION LOAD REPLACE "#!js name=myFirstLibrary api_version=1.0\n 
    function addLastUpdatedField(client, data) {
        if(data.event == 'hset') {
            var currentDateTime = Date.now();
            client.call('hset', data.key, 'last_updated', currentDateTime.toString());
        }
    } 

    redis.registerKeySpaceTrigger('addLastUpdated', 'fellowship:', addLastUpdatedField);" // Register the KeySpaceTrigger 'AddLastUpdated' for keys with the prefix 'fellowship' with a callback to the function 'addLastUpdatedField'
```

Add a new hash with the required prefix to trigger our function.

```redis Set an example
HSET fellowship:1 
    name "Frodo Baggins" 
    title "The One Ring Bearer"
```

Check if the last updated time is added to the example.

```redis View result
HGETALL fellowship:1
```
