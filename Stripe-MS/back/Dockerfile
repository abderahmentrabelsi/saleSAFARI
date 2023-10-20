# back/Dockerfile

# Choose the base image for Node.js
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./
COPY yarn.lock ./

# Install dependencies using Yarn and cache them
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
