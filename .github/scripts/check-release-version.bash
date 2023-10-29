#!/usr/bin/env bash

compare_versions() {
  # Split version strings into arrays
  IFS='.' read -ra CURRENT_VERSION_ARR <<< "$1"
  IFS='.' read -ra LATEST_VERSION_ARR <<< "$2"

  for i in 0 1 2; do
      if [[ ${CURRENT_VERSION_ARR[i]} -lt ${LATEST_VERSION_ARR[i]} ]]; then
          return 0
      elif [[ ${CURRENT_VERSION_ARR[i]} -gt ${LATEST_VERSION_ARR[i]} ]]; then
          return 1
      fi
  done

  return 1
}

get_version() {
  curl -s https://api.github.com/repos/RedisInsight/RedisInsight/releases/latest \
      | grep "tag_name" \
      | cut -d : -f 2,3 \
      | tr -d \", \
      | xargs
}

CURRENT_VERSION=$(cat VERSION)
LATEST_VERSION=$(get_version)
[ -z "$1" ] && SKIP_PUSH="no" || SKIP_PUSH="$1"

compare_versions "$CURRENT_VERSION" "$LATEST_VERSION"
GREATER=$?


if [[ $GREATER -eq 1 ]]; then
  echo "Current version $CURRENT_VERSION is greater or same than latest version $LATEST_VERSION"
  exit 0
fi;

echo "$LATEST_VERSION" > VERSION
rm -rf ri-src && mkdir ri-src
pushd ri-src  > /dev/null || exit 1

curl -s https://api.github.com/repos/RedisInsight/RedisInsight/releases/latest \
| grep "tarball_url" \
| cut -d : -f 2,3 \
| tr -d \", \
| xargs wget -q -O - \
| tar -xz --strip-components=1

popd > /dev/null || exit 1

REMOTE_REPO="https://github.com/${GITHUB_REPOSITORY}.git"

./.github/scripts/build.bash front back

rm -rf ri-src

if [ "$SKIP_PUSH" == "yes" ]; then
  echo "Skipping push to $REMOTE_REPO"
  exit 0
fi

git config user.name "oblakbot"
git config user.email "sibin.grasic+bot@oblak.studio"
git remote add publisher "$REMOTE_REPO"
git checkout master
git add -A
git commit -m "feat: Update RedisInsight to $LATEST_VERSION"
git push publisher master
