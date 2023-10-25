# Use the base image with Node.js
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

COPY . .

COPY /.next/standalone ./
COPY /.next/static ./.next/static


EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# Command to run the application
CMD ["node", "server.js"]
