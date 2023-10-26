FROM node:18-alpine

ENV NODE_ENV development

WORKDIR /app

COPY package*.json ./
COPY node_modules/ ./node_modules/
COPY dist/ ./dist/

ENTRYPOINT ["node", "dist/main.js"]
