#!/bin/sh
/wait-for-it.sh postgres:5434 -- echo "PostgreSQL is up"
npx prisma migrate deploy
npm run start:prod