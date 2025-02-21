#!/bin/sh
export $(grep -v '^#' .env | xargs)
npx nodemon dist/server.js
