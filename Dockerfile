FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app
COPY package*.json ./
# Copy the application files into the working directory
COPY . .

# Install the application dependencies
RUN npm ci

EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "run" ,"start"]
