# Dockerized Redis Insight (version2)


## Premise and description

Redis team offers Redis Insight v2 as a standalone electron app.  
Application is NestJS based, and can work under docker.
They even have a nice litle [Dockerfile](build/Dockerfile) to build the app in their repo.
Too bad, the build process is janky and it's really hard to build the image on your own.

Well, with some voodoo magic, Docker file changes, and a bit of luck, We managed to build the image - both for x86 and ARM64. 🎉🎉🎉

## How this repo works.

We check weekly for new RedisInsight releases. If there is a newer release, we copy it to our repo, and we replace the docker entrypoint and Dockerfile with our own.
Then we build the images.

We build on self-hosted runners - both for x86 and ARM64.

## Self-hosted runners? Why?

The entire application is one huge dependency hell and has a really specific and finicky build process.
We won't even get into details, But it seems it can only compile on Ubuntu 20.04 (or 22.04) With Node JS <=18 and yarn <=1.22.

Most of the errors stem from the SQLite 3 libs and node-gyp bindings, which are basically unresolvable.
If the yarn.lock file changes - the build will fail. If the nodeJS version changes - the build will fail. If the OS changes - the build will fail.

Due to another dependency hell (on frontend), yarn bugs, voodoo magic and other poor architectural decisions linux/arm64 version won't compile under QEMU. We have 45+ failed builds and 2 deleted git repos (that hide our shame) to prove it.

So - we decided to spin up two instances. One x86 and one arm64. And we build the images there. And then we push them to docker hub.

> **Warning**
> 
> We tested the installation on the following platforms:
> * Ubuntu - 20.04, 22.04
> * Debian - 10, 11, 12
> * CentOS - 7, 8
> * AlmaLinux 8
> * Windows 7, 8.1, 10, 11
> * MacOS - 12+ (Monterey) - Both Intel, M1 and M2  
> 
> We cannot guarantee it will work on your system. But it should. If it doesn't - open an issue and we'll try to help.

### Why are we messing with the Dockerfile?

The original Dockerfile installs avahi-daemon and libnss-mdns, which are not needed for the app to work in a dockerized environment, Redis teams uses is for some voodoo resolving of redis enterprise instances (which nobody uses anyway).

Usage of avahi-daemon and libnss-mdns in a dockerized environment is not recommended, and can cause issues with DNS resolution. Not only that it can - but it does. 9 times out of 10 - on image restart or fresh build, you won't be able to connect to redis instances via hostname.

So - we removed them. And nothing of value was lost 🚮

Additionally, they use outdated nodeJS images with pinned versions of nodeJS. We use the latest nodeJS 18 image, and we don't pin the version of nodeJS. This way, we can use the latest nodeJS version, and we don't have to update the Dockerfile every time nodeJS releases a new version.

The end result is a smaller image, with the latest nodeJS version, and without avahi-daemon and libnss-mdns.

### Why are we messing with the entrypoint?

The original entrypoint starts avahi daemon and then starts the app. We don't need avahi daemon, so we removed it from the entrypoint.

Again - nothing of value was lost.

Since the documentation for the app is non-existant, you wouldn't know that you need to define an env-var for the data encryption to work properly. We added that to the entrypoint - So no more `gnome-keyring-daemon: Operation not permitted` errors on startup.

We've also moved the logging to STDOUT instead of a file (in a anonymous volume), so you can actually know and see what's going on with the app while it's running.

You would imagine that a company with valuation of $2B could afford to hire a technical writer to write a few lines of documentation for their app. But no. They can't. So we have to do it for them.

## This is all great, but how can I use the image.

```bash
$ docker pull oblakstudio/redisinsight:latest
```

## Environment variables

Here is the list of environment variables you can use to configure the app.
The list is not final. You can find the full list of environment variables in the [default.ts](build/redisinsight/api/config/default.ts) file.

Default values with asterisk are overriden by us.

| Variable        | Type      | Description                       | Default   |
|-----------------|-----------|-----------------------------------|-----------|
| RI_HOSTNAME     | string    | IP address or hostname to bind to | 0.0.0.0   |
| SERVER_TLS      | boolean   | Enable TLS                        | true      |
| SERVER_TLS_CERT | string    | Path to TLS certificate file      | undefined |
| SERVER_TLS_KEY  | string    | Path to TLS key file              | undefined |
| LOG_LEVEL       | string    | Log level                         | info      |
| STDOUT_LOGGER   | boolean   | Log to STDOUT                     | true*     |
| FILES_LOGGER    | boolean   | Log to file                       | false*    |

Unfortunately application binds to a hardcoded port 5000, and there is no way to change it except in the source code. But the container exposes port 5000, so you can map it to whatever port you want, or use a reverse proxy to proxy the traffic to the container.

We do something like that in our [ddev-redis-insight](https://github.com/oblakstudio/ddev-redis-insight) project.

## Sugar, spice, and everything nice

We hope you enjoy the images, and we hope they work for you. If they don't - open an issue and we'll try to help.
The application itself is awesome - it is easily the best GUI for redis, and we hope Redis team will continue to develop it and improve it.

We also hope they will improve the build process, and make it easier to build the app on your own, or that they will provide an official docker image for the app.

Until then - we'll do it for them. Because someone needs to - if not us - then who? If not now - then when?

## Credits and Licensing

All credits for the app go to Redis team. We just built the images.
Source code for the workflows, Dockerfiles and entrypoints is licensed under MIT license.
Redis uses SSPL license for the app itself. We don't know what that means, but we're pretty sure it's not MIT license. (Just kidding, SSPL is not OSI approved, nor GPL compatible, so it's not open source).

---

## Support us

If you like our work, and you want to support us, you can do so by buying us a coffee.
And by buying us a coffee, we think you should donate to a charity of your choice, or plant a tree, or do something good for the world.

If you have the time though, you can check out our [GitHub organization](https://github.com/oblakstudio), see if you can find something useful there. 

