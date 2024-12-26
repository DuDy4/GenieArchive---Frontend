# Use Node.js 20 base image
FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application, including SSL certificates
COPY . .

# Build the application
RUN npm run build

# Install 'serve' globally to serve the built files
RUN npm install -g serve

# Expose port 5173 for HTTPS
EXPOSE 5173

# Command to start the application with HTTPS
CMD ["serve", "-s", "dist", "-l", "5173"]
