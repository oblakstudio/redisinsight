#!/usr/bin/env bash
set -e

DO_FRONT="false"
DO_BACK="false"
SECONDS=0


if [ "$1" == "front" ]; then
  DO_FRONT="true"
fi

if [ "$1" == "back" ] || [ "$2" == "back"  ]; then
  DO_BACK="true"
fi

export COMMANDS_TRIGGERS_AND_FUNCTIONS_DEFAULT_URL='https://raw.githubusercontent.com/RedisGears/RedisGears/master/commands.json'

SRC_FOLDER=$(pwd)/ri-src
TARGET_FOLDER=$(pwd)/build
FRONT_FOLDER=$(realpath "$(pwd)/../redis-insight-front")
BACK_FOLDER=$(realpath "$(pwd)/../redis-insight-back")

if [ "$DO_FRONT" == "true" ]; then

  if [ -d "$FRONT_FOLDER" ]; then
    rm -rf "$FRONT_FOLDER"
  fi

  mkdir -p "$FRONT_FOLDER"

  cp "$SRC_FOLDER/package.json" "$SRC_FOLDER/yarn.lock" "$SRC_FOLDER/babel.config.cjs" "$SRC_FOLDER/tsconfig.json" "$FRONT_FOLDER"

  pushd "$FRONT_FOLDER" > /dev/null 2>&1 || exit

  printf "Installing redisinsight/ui dependencies... "
  SKIP_POSTINSTALL=1 yarn install --network-timeout 600000 > /dev/null 2>&1
  printf "DONE!\n"

  popd > /dev/null 2>&1 || exit

  cp -r "$SRC_FOLDER/configs" "$SRC_FOLDER/scripts" "$SRC_FOLDER/redisinsight" "$FRONT_FOLDER"

  pushd "$FRONT_FOLDER" > /dev/null 2>&1 || exit

  printf "Installing redisinsight/ui dependencies (again)... "
  yarn --cwd redisinsight/api > /dev/null 2>&1
  printf "DONE!\n"

  printf "Building redisinsight/ui (This will take a while)... "
  yarn build:web > /dev/null 2>&1
  printf "DONE!\n"

  printf "Building redisinsight/statics... "
  yarn build:statics > /dev/null 2>&1
  printf "DONE!\n"

  popd > /dev/null 2>&1 || exit

fi

if [ "$DO_BACK" == "true" ]; then

  if [ -d "$BACK_FOLDER" ]; then
    rm -rf "$BACK_FOLDER"
  fi

  mkdir -p "$BACK_FOLDER"

  cp "$SRC_FOLDER/redisinsight/api/package.json" "$SRC_FOLDER/redisinsight/api/yarn.lock" "$BACK_FOLDER"

  pushd "$BACK_FOLDER" > /dev/null 2>&1 || exit

  printf "Installing redisinsight/api dependencies... "
  yarn install --network-timeout 600000 > /dev/null 2>&1
  printf "DONE!\n"

  popd > /dev/null 2>&1 || exit

  cp -r "$SRC_FOLDER"/redisinsight/api/* "$BACK_FOLDER"

  pushd "$BACK_FOLDER" > /dev/null 2>&1 || exit

  cp -r "$FRONT_FOLDER/redisinsight/api/static" "$BACK_FOLDER"
  cp -r "$FRONT_FOLDER/redisinsight/api/defaults" "$BACK_FOLDER"

  printf "Building redisinsight/api... "
  yarn build:prod > /dev/null 2>&1
  printf "DONE!\n"

  popd > /dev/null 2>&1 || exit


fi

rm -rf "$TARGET_FOLDER"
mkdir -p "$TARGET_FOLDER/front" "$TARGET_FOLDER/back"

cp -ar "$FRONT_FOLDER"/redisinsight/ui/dist/* "$TARGET_FOLDER/front/"
cp -ar "$BACK_FOLDER"/dist/* "$TARGET_FOLDER/back/"
cp "$SRC_FOLDER/redisinsight/api/.yarnclean.prod" "$TARGET_FOLDER/back/.yarnclean"


cp "$SRC_FOLDER/redisinsight/api/package.json" "$SRC_FOLDER/redisinsight/api/yarn.lock" "$TARGET_FOLDER"
jq 'del(.devDependencies)' "$TARGET_FOLDER/package.json" > tmp.json && mv tmp.json "$TARGET_FOLDER/package.json"

printf "Build finished in: %ds\n" "$SECONDS"
