FROM node:18-alpine

ENV NODE_ENV development

USER node
WORKDIR /home/node

COPY package*.json ./
COPY node_modules/ ./node_modules/
COPY dist/ ./dist/

CMD ["node", "dist/server.js"]
