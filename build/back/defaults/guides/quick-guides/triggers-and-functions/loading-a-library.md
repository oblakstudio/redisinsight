When creating a new library we add the code using the `TFUNCTION LOAD` command.

The code needs to contain a prologue where we define which engine is used, the name of the library, and the minimum API version to use.

```redis Upload library
TFUNCTION LOAD 
    "#!js name=myFirstLibrary api_version=1.0\n
    redis.registerFunction('hello', ()=>{
        return 'Hello World';
    });" // The argument with the library code
```

To view the uploaded library we can use the following command.

```redis View libraries
TFUNCTION LIST
```

Execute the function that was uploaded.

```redis Execute function
TFCALL // TFCALL for running sync functions, FCALLASYNC for async
    myFirstLibrary.hello // The name of the library.function
    0 // The number of keys given
```

We can give arguments when we are executing the command.
To update the library, add `REPLACE` to the `LOAD` command.

```redis Replace the library
TFUNCTION LOAD REPLACE // The replace flag is added when the library already exist
    "#!js name=myFirstLibrary api_version=1.0\n
    redis.registerFunction('hello', (client, arg)=>{
        return 'Hello ' + arg;
    });"
```

Now run the command with an additional argument.

```redis Execute function
TFCALL
    myFirstLibrary.hello
    0
    John // We add the arguments at the end of the TFCALL command, after the keycount and the keys.
```

The library can be deleted with the following command.

```redis Delete library
TFUNCTION DELETE myFirstLibrary
```
