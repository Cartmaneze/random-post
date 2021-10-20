FROM node:12.18.2-alpine

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python jq
RUN npm install --quiet node-gyp -g

ARG NODE_ENV

ARG SENTRY_RELEASE

ENV NODE_ENV ${NODE_ENV:-dev}

RUN mkdir app

WORKDIR /app

ADD package*.json /app/

RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev

RUN npm install

RUN npm i canvas --build-from-source

ADD dist /app/dist/

EXPOSE 8080

CMD npm run start:${NODE_ENV} | grep -v ELB-HealthCheckÍer
