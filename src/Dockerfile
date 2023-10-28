FROM node:18-alpine as front

LABEL org.opencontainers.image.source="https://github.com/oblakstudio/redisinsight" \
  org.opencontainers.image.authors="Oblak Studio <support@oblak.studio>" \
  org.opencontainers.image.title="Redis Insight v2" \
  org.opencontainers.image.description="Docker Optimized Redis Insight v2" \
  org.opencontainers.image.licenses="SSPL"

ENV DEBIAN_FRONTEND noninteractive
ENV COMMANDS_TRIGGERS_AND_FUNCTIONS_DEFAULT_URL='https://raw.githubusercontent.com/RedisGears/RedisGears/master/commands.json'

RUN apk update
RUN apk add --no-cache --virtual .gyp python3 make g++ && \
    npm install -g node-gyp
WORKDIR /usr/src/app
COPY package.json yarn.lock babel.config.js tsconfig.json ./
RUN SKIP_POSTINSTALL=1 yarn install --network-timeout 600000
COPY configs ./configs
COPY scripts ./scripts
COPY redisinsight ./redisinsight
RUN yarn --cwd redisinsight/api
ARG SERVER_TLS_CERT
ARG SERVER_TLS_KEY
ARG SEGMENT_WRITE_KEY
ENV SERVER_TLS_CERT=${SERVER_TLS_CERT}
ENV SERVER_TLS_KEY=${SERVER_TLS_KEY}
ENV SEGMENT_WRITE_KEY=${SEGMENT_WRITE_KEY}
RUN yarn build:web
RUN yarn build:statics

FROM node:18-alpine as back

ENV COMMANDS_TRIGGERS_AND_FUNCTIONS_DEFAULT_URL='https://raw.githubusercontent.com/RedisGears/RedisGears/master/commands.json'

WORKDIR /usr/src/app
COPY redisinsight/api/package.json redisinsight/api/yarn.lock ./
RUN yarn install --network-timeout 600000 --force
COPY redisinsight/api ./
COPY --from=front /usr/src/app/redisinsight/api/static ./static
COPY --from=front /usr/src/app/redisinsight/api/defaults ./defaults
RUN yarn --cwd redisinsight/api run build:prod

FROM node:18-slim

ENV SERVER_STATIC_CONTENT=true
ENV BUILD_TYPE='DOCKER_ON_PREMISE'

WORKDIR /usr/src/app

COPY --from=back /usr/src/app/dist ./redisinsight/api/dist
COPY --from=front /usr/src/app/redisinsight/ui/dist ./redisinsight/ui/dist

COPY docker-entry.sh ./
RUN chmod +x docker-entry.sh && \
    apt-get update -y && \
    apt-get install -y --no-install-recommends \
    dbus-x11 gnome-keyring libsecret-1-0 jq && \
    dbus-uuidgen > /var/lib/dbus/machine-id && \
    rm -rf /var/cache/apk/* /var/tmp/* /tmp/*

EXPOSE 5000

ENTRYPOINT ["./docker-entry.sh", "node", "redisinsight/api/dist/src/main"]
