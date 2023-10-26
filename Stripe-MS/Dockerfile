# back/Dockerfile

# Choose the base image for Node.js
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 4000

ENV NODE_ENV=development
# Start the application
CMD ["npm", "run", "gadma"]
