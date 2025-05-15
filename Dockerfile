#BASIC IMAGE
FROM node:18-alpine

#SET WORKING DIRECTORY
WORKDIR /app

#INSTALL DEPENDENCE
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Generate Prisma client
RUN yarn prisma generate

# Build app
RUN yarn build

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/infra/framework/main.js"]