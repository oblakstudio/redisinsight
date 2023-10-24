#!/bin/bash
# maintainer - Lazar Ivkovic

temp_dir=$(mktemp -d)

github_url="https://github.com/RedisInsight/RedisInsight"

latest_release_tag=$(curl -sL -I -o /dev/null -w "%{url_effective}" "$github_url/releases/latest" | awk -F / '{print $NF}' | tr -d '\r')

echo "Download the latest release: $latest_release_tag"
curl -L -o "$temp_dir/$latest_release_tag.tar.gz" "$github_url/archive/$latest_release_tag.tar.gz"

echo "Uncompress to a temporary directory"
mkdir -p "$temp_dir/$latest_release_tag"
tar -xzvf "$temp_dir/$latest_release_tag.tar.gz" -C "$temp_dir/$latest_release_tag" --strip-components=1

echo "Update build dir"
rm -rf build && mkdir -p build
cp -r "$temp_dir/$latest_release_tag"/* build

echo "Get source Docker conf"
cp -f src/Dockerfile build/Dockerfile
cp -f src/docker-entry.sh build/docker-entry.sh

echo "Deleting the temporary directory: $temp_dir"
rm -r "$temp_dir"

echo "The update is complete."
