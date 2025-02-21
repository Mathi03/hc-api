# Use a base Node.js image
FROM node:18-alpine

# Set the timezone to CST
ENV TZ=America/Chicago

# Install tzdata to ensure timezone setting works
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/America/Chicago /etc/localtime && \
    echo "America/Chicago" > /etc/timezone
    
# Set the working directory inside the container
WORKDIR /backend

# Copy the configuration and dependency files
COPY package*.json ./

RUN npm cache clean --force

# Install the project dependencies
RUN npm install --omit=dev

# Install TypeScript globally
RUN npm install -g typescript

# Copy the entire application code
COPY . .

# Compile TypeScript
RUN npx tsc

# Expose the application port
EXPOSE 8080

# Start the application in production mode
CMD ["node", "dist/server.js"]
