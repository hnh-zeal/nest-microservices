# Use the official Node.js image
FROM node:alpine As development

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn-lock.json
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY apps/notifications apps/notifications
COPY libs libs

# Install the dependencies for the notifications service
RUN cd apps/notifications && yarn install

# Build the application
RUN yarn build notifications

# Production
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/notifications/main"]