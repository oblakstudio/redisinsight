# Dockerized Redis Insight (version 2)

![GitHub release (with filter)](https://img.shields.io/github/v/release/RedisInsight/RedisInsight?label=Upstream+Version&color=D82C20)
![GitHub release (with filter)](https://img.shields.io/github/v/release/oblakstudio/redisinsight?label=Docker+Build&color=0049ff)
![Docker Pulls](https://img.shields.io/docker/pulls/oblakstudio/redisinsight)
![Maintenance](https://img.shields.io/maintenance/yes/2024)

---

If you want to skip all the boring and snarky details, click [**HERE**](#this-is-all-great-but-how-can-i-use-the-image) to read the instructions on using the image.

## Premise and description

Redis team offers Redis Insight v2 as a standalone electron app.  
Application is NestJS based, and can work under docker.
They even have a nice litle [Dockerfile](https://github.com/RedisInsight/RedisInsight/blob/main/Dockerfile) to containerize the app they built.
Too bad, their Docker build process is broken, janky, and doesn't work.

Well, by doing ~~some voodoo magic~~, ~~Docker file changes, and a bit of luck~~ a complete dockerfile rewrite and implementing a custom build process we managed to build the image - both for x86 and ARM64. 🎉🎉🎉

## How this repo works.

1. We check ~~weekly~~ ~~daily~~ ~~hourly~~ **daily**  for new RedisInsight releases.
2. If there is a newer release, we copy the source code to our repo and run our own build process.
3. If the build succeds, we commit the results to the repo, and run our own semantic-release process.
4. We build tagged images, and push them to docker hub.

> [!NOTE]
> We used to build on self-hosted runners - but we moved the build process back to github runners.

## Why the total Dockerfile rewrite?

The original Dockerfile installs avahi-daemon and libnss-mdns, which are not needed for the app to work in a dockerized environment, Redis teams uses is for some voodoo resolving of redis enterprise instances (which nobody uses anyway).

Usage of avahi-daemon and libnss-mdns in a dockerized environment is not recommended, and can cause issues with DNS resolution. Not only that it can - but it does. 9 times out of 10 - on image restart or fresh build, you won't be able to connect to redis instances via hostname.

So - we removed them. And nothing of value was lost 🚮

We also removed `gnome-keyring` and `libsecret` packages used to encrypt secrets and passwords in the redis-insight sqlite database. According to [@germanattanasio](https://github.com/germanattanasio) it's not needed in a dockerized / kubernetes environment (and we agree with him - because our parents taught us to always listen to strangers on the internet).  
Removing these packages also disables the need for `IPC_LOCK` capability for the container to work properly.

Removing the encryption crap enables us to run the entire app as a non-root user, which is always a good thing.  
(When we're not saving the planet, we're all about security).

As an extra bonus we added a anonymous volume at `/data` so if you're forgetful (like us), and you forget to map the volume to a persistent storage, you won't lose your data when you restart the container.

Since nothing of value was lost with the removals, and since we're running our own build process (because a $2B company can't be bothered to fix their build process) we switched the image to use alpine instead of debian. This way we get a smaller image, and reduce the carbon footprint of the image downloads.  
(We're all about saving the planet here at Oblak Studio).

End result is:
* Smaller image
* No avahi-daemon
* No libnss-mdns
* No gnome-keyring
* Data persistence

As an added benefit, your CISO will not yell at you for running a container as root with IPC_LOCK capability.  
(Toxic work environments are bad for your health)

## Why are we messing with the entrypoint?

The original entrypoint starts avahi daemon and then starts the app. We don't need avahi daemon, so we removed it from the entrypoint.

We've also moved the logging to STDOUT instead of a file (in a anonymous volume), so you can actually know and see what's going on with the app while it's running.

Additionally, we preconfigure the app to use persistent storage as a data directory. This way you can mount a volume to that directory and persist the data between container restarts.

You would imagine that a company with valuation of $2B could afford to hire a technical writer to write a few lines of documentation for their app. But no. They can't. So we have to do it for them.

## This is all great, but how can I use the image.

```bash
$ docker pull oblakstudio/redisinsight:latest
$ docker run -d --name redisinsight -p 5540 oblakstudio/redisinsight:latest
```

### Environment variables

Here is the list of environment variables you can use to configure the app.
The list is not final. You can find the full list of environment variables in the [default.ts]([build/redisinsight/api/config/default.ts](https://github.com/RedisInsight/RedisInsight/blob/main/redisinsight/api/config/default.ts)) and [production.ts](https://github.com/RedisInsight/RedisInsight/blob/main/redisinsight/api/config/production.ts) files.

Default values with asterisk are overriden by us.

| Variable        | Type      | Description                       | Default   |
|-----------------|-----------|-----------------------------------|-----------|
| RI_HOSTNAME     | string    | IP address or hostname to bind to | 0.0.0.0   |
| API_PORT        | number    | Port to bind to                   | 5540      |
| SERVER_TLS      | boolean   | Enable TLS                        | true      |
| SERVER_TLS_CERT | string    | Path to TLS certificate file      | undefined |
| SERVER_TLS_KEY  | string    | Path to TLS key file              | undefined |
| LOG_LEVEL       | string    | Log level                         | info      |
| STDOUT_LOGGER   | boolean   | Log to STDOUT                     | true*     |
| FILES_LOGGER    | boolean   | Log to file                       | false*    |

## Sugar, spice, and everything nice

We hope you enjoy the images, and we hope they work for you. If they don't - open an issue and we'll try to help.
The application itself is awesome - it is easily the best GUI for redis, and we hope Redis team will continue to develop it and improve it.

We also hope they will improve the build process, and make it easier to build the app on your own, or that they will provide an official docker image for the app.

Until then - we'll do it for them. Because someone needs to - if not us - then who? If not now - then when?  
(We're all about snark to snark combat - it's good for the soul)

## Credits and Licensing

All credits for the app go to Redis team. We just built the images.
Source code for the workflows, Dockerfiles and entrypoints is licensed under MIT license.
Redis uses SSPL license for the app itself. We don't know what that means, but we're pretty sure it's not MIT license. (Just kidding, SSPL is not OSI approved, nor GPL compatible, so it's not open source).

Our Dockerfile, entrypoint and workflows are licensed under MIT license - with a caveat.  
If you are affiliated with Redis / Redis Labs in any way - you're not permitted to do anything with our source code.  
(Because their reps keep ignoring us, and we're petty like that 😇)

---

## Support us (or don't)

If you like our work, and you want to support us, you can do so by buying us a coffee.
And by buying us a coffee, we think you should donate to a charity of your choice, or plant a tree, or do something good for the world.

If you have the time though, you can check out our [GitHub organization](https://github.com/oblakstudio), see if you can find something useful there.  
We also want to thank [Lazar Ivkovic](https://github.com/lazarivkovic) for his contribution and ideas to this project - we couldn't have done it without you, boi. 💙
