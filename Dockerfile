# 1. Use the official Node.js image
FROM node:22-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your project files
COPY . .

# 5. Build the Next.js project
#RUN npm run build

# 6. Expose port 3000
EXPOSE 3000

# 7. Start the Next.js app in production
CMD ["npm", "start"]
