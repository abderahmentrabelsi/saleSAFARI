FROM node:18-alpine

ENV NODE_ENV development

WORKDIR /app

COPY package*.json ./
COPY node_modules/ ./node_modules/
COPY dist/ ./dist/

ADD wait-for.sh /wait-for.sh
RUN chmod +x /wait-for.sh

ENTRYPOINT ["/wait-for.sh", "-t", "240", "eureka-server:8761", "--", "node", "dist/main.js"]
