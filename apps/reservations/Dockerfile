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
COPY . .

RUN yarn build

# Production
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]