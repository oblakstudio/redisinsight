When creating a new library you add the code to Redis using the `TFUNCTION LOAD` command.
The code needs to contain a preamble that defines which engine is used, the name of the library, and the minimum API version to use.

```redis:[run_confirmation=true] Upload library
TFUNCTION LOAD 
    "#!js name=myFirstLibrary api_version=1.0\n
    redis.registerFunction('hello', ()=>{
        return 'Hello World';
    });" // The argument with the library code
```

To view the uploaded library use the following command.

```redis View libraries
TFUNCTION LIST
```

Execute the function that was uploaded.

```redis:[run_confirmation=true] Execute function
TFCALL // TFCALL for running sync functions, TFCALLASYNC for async
    myFirstLibrary.hello // the name of the library.function
    0 // the number of keys provided as arguments
```

You can pass arguments to your functions when executing them. In the following example, you'll upload a new version of the previous library that illustrates how to use arguments.

To update the library, add the `REPLACE` option to the `LOAD` command.

```redis:[run_confirmation=true] Replace the library
TFUNCTION LOAD REPLACE // The replace flag is added when the library already exist
    "#!js name=myFirstLibrary api_version=1.0\n
    redis.registerFunction('hello', (client, arg)=>{
        return 'Hello ' + arg;
    });"
```

Now run the command with an additional argument. It's important to understand that `TFCALL` takes both keys and arguments. Because arguments follow keys, the number of keys passed is still `0` in this example.

```redis:[run_confirmation=true] Execute function
TFCALL
    myFirstLibrary.hello
    0
    John // We add the arguments at the end of the TFCALL command, after the keycount and the keys.
```

The library can be deleted with the following command.

```redis:[run_confirmation=true] Delete library
TFUNCTION DELETE myFirstLibrary
```
