#!/bin/bash

echo "Migration running"
npx prisma migrate dev --name init

echo "Starting microservice"
pnpm run start:dev