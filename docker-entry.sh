#!/bin/sh
# Entry point for distributable docker image

# This script turns of file logger in order to prevent disk space waste
# and then turns on the STDOUT logger. So you can actually see what's going on with the app
# If the CMD directive is specified in the Dockerfile, those commands
# are passed to this script. This can be overridden by the user in the
# `docker run`

set -e

if [ -z "$APP_FOLDER_ABSOLUTE_PATH" ]; then
    export APP_FOLDER_ABSOLUTE_PATH="/data"
fi

if [ -z "$STDOUT_LOGGER" ]; then
    export STDOUT_LOGGER=true
fi

if [ -z "$FILES_LOGGER" ]; then
    export FILES_LOGGER=false
fi

# Run the application's entry script with the exec command so it catches SIGTERM properly
exec "$@"
