FROM node:12.18.2-alpine

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python jq
RUN npm install --quiet node-gyp -g

ARG NODE_ENV

ARG SENTRY_RELEASE

ENV NODE_ENV ${NODE_ENV:-dev}

RUN mkdir app

WORKDIR /app

ADD package*.json /app/

RUN apk add --no-cache \
        build-base \
        g++ \
        cairo-dev \
        jpeg-dev \
        pango-dev \
        giflib-dev

RUN npm install

ADD dist /app/dist/

EXPOSE 8080

CMD npm run start:${NODE_ENV} | grep -v ELB-HealthCheckÍer
