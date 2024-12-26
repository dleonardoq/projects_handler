#!/bin/bash

npx prisma migrate dev --name init

pnpm run start:dev