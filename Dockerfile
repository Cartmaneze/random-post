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
        sudo \
        curl \
        build-base \
        g++ \
        libpng \
        libpng-dev \
        jpeg-dev \
        pango-dev \
        cairo-dev \
        giflib-dev \
        python

RUN apk --no-cache add ca-certificates wget  && \
        wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
        wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.29-r0/glibc-2.29-r0.apk && \
        apk add glibc-2.29-r0.apk && \
        npm install canvas@2.8.0

RUN npm install

ADD dist /app/dist/

EXPOSE 8080

CMD npm run start:${NODE_ENV} | grep -v ELB-HealthCheckÍer
