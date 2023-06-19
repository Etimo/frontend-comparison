#!/bin/sh

mkdir -p public/css && sass src/scss/style.scss public/css/style.css && dotenv -e .env ts-node ./src/index.ts