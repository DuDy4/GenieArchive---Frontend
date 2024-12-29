# Use Node.js 20 base image
FROM node:20 as builder

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first for dependency installation
COPY package*.json ./

ARG VITE_EMAIL_VERIFICATION=@genieai.ai
ARG VITE_API_URL=https://api.genieai.ai/v1
ARG VITE_SELF_URL=https://alpha.genieai.ai
ARG VITE_AUTH0_CLIENT_ID=uXuyPkNPsIPEC2GYcFBbNV3y0kSqzFx4
ARG VITE_AUTH0_DOMAIN=https://dev-ef3pwnhntlcnkc81.us.auth0.com
# Install dependencies
RUN npm install

# Copy the rest of the application, including SSL certificates
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:1.26.2
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
