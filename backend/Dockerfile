FROM node:10.4-alpine AS builder

ENV NODE_ENV production

RUN npm i -g pnpm

COPY package.json shrinkwrap.yaml /tmp/app/
RUN cd /tmp/app \
    && pnpm install --only prod

################################################################################

FROM node:10.4-alpine

ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN rm -rf /usr/src/app/node_modules
COPY --from=builder /tmp/app/node_modules /usr/src/app/node_modules

EXPOSE 3000

CMD [ "npm", "start" ]
