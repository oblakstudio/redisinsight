FROM node:18-slim

LABEL org.opencontainers.image.source="https://github.com/oblakstudio/redisinsight" \
  org.opencontainers.image.authors="Oblak Studio <support@oblak.studio>" \
  org.opencontainers.image.title="Redis Insight v2" \
  org.opencontainers.image.description="Docker Optimized Redis Insight v2" \
  org.opencontainers.image.licenses="SSPL"

ENV DEBIAN_FRONTEND noninteractive
RUN set -ex \
  && apt-get update -y
RUN apt-get install net-tools -y
RUN --mount=target=/var/lib/apt/lists,type=cache,sharing=locked \
  --mount=target=/var/cache/apt,type=cache,sharing=locked \
  rm -f /etc/apt/apt.conf.d/docker-clean \
  && apt-get update \
  && apt-get -y --no-install-recommends install \
  dbus-x11 gnome-keyring libsecret-1-0 jq
RUN dbus-uuidgen > /var/lib/dbus/machine-id

ARG NODE_ENV=production
ARG SERVER_TLS_CERT
ARG SERVER_TLS_KEY
ARG SEGMENT_WRITE_KEY
ENV SERVER_TLS_CERT=${SERVER_TLS_CERT}
ENV SERVER_TLS_KEY=${SERVER_TLS_KEY}
ENV SEGMENT_WRITE_KEY=${SEGMENT_WRITE_KEY}
ENV NODE_ENV=${NODE_ENV}
ENV SERVER_STATIC_CONTENT=true
ENV BUILD_TYPE='DOCKER_ON_PREMISE'
ENV COMMANDS_TRIGGERS_AND_FUNCTIONS_DEFAULT_URL='https://raw.githubusercontent.com/RedisGears/RedisGears/master/commands.json'

RUN mkdir -p /usr/src/app/redisinsight
RUN mkdir -p /usr/src/app/redisinsight/api
RUN mkdir -p /usr/src/app/redisinsight/ui

WORKDIR /usr/src/app/redisinsight
COPY ./build/front ./ui/dist
COPY ./build/back ./api/dist

COPY build/package.json build/yarn.lock ./api/
RUN yarn --cwd ./api install --production --frozen-lockfile
RUN mv ./api/dist/.yarnclean ./api/
RUN yarn --cwd ./api autoclean --force

COPY ./docker-entry.sh ./
RUN chmod +x docker-entry.sh

EXPOSE 5000

ENTRYPOINT ["./docker-entry.sh", "node", "api/dist/src/main"]
