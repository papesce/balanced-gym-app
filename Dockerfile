# Use the official Node.js 12 image as the base image
FROM node:12.14.1

# Install TypeScript globally
RUN npm install -g typescript@3.7.2

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies using Yarn
RUN yarn install


# Copy the rest of the application code
COPY . .

RUN yarn build

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["yarn", "start"]



