# back/Dockerfile

# Choose the base image for Node.js
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["yarn", "gadma"]
