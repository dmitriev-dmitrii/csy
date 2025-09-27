FROM node:20

# Set the working directory in the container
WORKDIR . .

# Copy the application files into the working directory
COPY . .

# Install the application dependencies
RUN npm ci



# Define the entry point for the container
CMD ["npm", "run" ,"start"]
