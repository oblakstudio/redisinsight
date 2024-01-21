FROM node:18-alpine as BACK

LABEL org.opencontainers.image.source="https://github.com/oblakstudio/redisinsight" \
  org.opencontainers.image.authors="Oblak Studio <support@oblak.studio>" \
  org.opencontainers.image.title="Redis Insight v2" \
  org.opencontainers.image.description="Docker Optimized Redis Insight v2" \
  org.opencontainers.image.licenses="MIT"

RUN mkdir /data && chown node:node /data

USER node
RUN mkdir -p /home/node/redisinsight/api && mkdir -p /home/node/redisinsight/ui && mkdir -p /home/node/.redisinsight-v2

WORKDIR /home/node/redisinsight
COPY --chown=node:node ./build/front ./ui/dist
COPY --chown=node:node ./build/back ./api/dist
COPY --chown=node:node build/package.json build/yarn.lock ./api/

ENV NODE_ENV=production
RUN yarn --cwd ./api install --production --frozen-lockfile --network-timeout 600000
RUN mv ./api/dist/.yarnclean ./api/
RUN yarn --cwd ./api autoclean --force

COPY --chown=node:node ./docker-entry.sh ./
RUN chmod +x docker-entry.sh

FROM scratch as FINAL

COPY --from=BACK / /
WORKDIR /home/node/redisinsight

VOLUME /data
EXPOSE 5000

USER node
ENV NODE_ENV=production
ENV SERVER_STATIC_CONTENT=true
ENV BUILD_TYPE='DOCKER_ON_PREMISE'
ENV COMMANDS_TRIGGERS_AND_FUNCTIONS_DEFAULT_URL='https://raw.githubusercontent.com/RedisGears/RedisGears/master/commands.json'

ENTRYPOINT ["./docker-entry.sh", "node", "api/dist/src/main"]
