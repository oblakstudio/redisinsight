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

compare_versions "$CURRENT_VERSION" "$LATEST_VERSION"
GREATER=$?


if [[ $GREATER -eq 1 ]]; then
  echo "Current version $CURRENT_VERSION is greater or same than latest version $LATEST_VERSION"
  exit 0
fi;

echo "$LATEST_VERSION" > VERSION

pushd build || exit 1

curl -s https://api.github.com/repos/RedisInsight/RedisInsight/releases/latest \
| grep "tarball_url" \
| cut -d : -f 2,3 \
| tr -d \", \
| xargs wget -q -O - \
| tar -xz --strip-components=1

popd || exit 1

rm -f build/Dockerfile
rm -f build/docker-entry.sh

cp -f src/Dockerfile build/Dockerfile
cp -f src/docker-entry.sh build/docker-entry.sh

REMOTE_REPO="https://github.com/${GITHUB_REPOSITORY}.git"

git config user.name "oblakbot"
git config user.email "sibin.grasic+bot@oblak.studio"
git remote add publisher "$REMOTE_REPO"
git checkout master
git add -A
git commit -m "feat: Update RedisInsight to $LATEST_VERSION"
git push publisher master
