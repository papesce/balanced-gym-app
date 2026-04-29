FROM node:22-slim

WORKDIR /app

COPY package.json yarn.lock ./
COPY packages/model/package.json packages/model/
COPY packages/server/package.json packages/server/
COPY packages/client/package.json packages/client/

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
