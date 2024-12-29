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

# Production stage
FROM nginx:1.26.2-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]