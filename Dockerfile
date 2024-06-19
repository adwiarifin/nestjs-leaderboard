FROM node:14-alpine AS base

RUN apk update \
  && apk add openssl1.1-compat

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY . .

RUN npx prisma generate
RUN npm run build

RUN cp .env.example .env
# RUN npx prisma migrate deploy

EXPOSE 3000

# RUN npx prisma version

# CMD ["sh", "-c", "/wait-for-it.sh postgres:5432 -- npx prisma migrate deploy && npm run start:prod"]

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]