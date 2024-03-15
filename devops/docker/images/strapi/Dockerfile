# Use the official Node.js 16 image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Install Strapi CLI globally
RUN npm install strapi@latest -g

# Create a new Strapi project
RUN strapi new my-strapi-project

# Set the working directory to the Strapi project directory
WORKDIR /usr/src/app/my-strapi-project

# Expose the default Strapi port
EXPOSE 1337

# Start Strapi
CMD ["strapi", "develop"]
