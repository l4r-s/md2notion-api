##
# Builder
##
FROM node:20.10-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

##
# Production
##
FROM node:20.10-alpine AS production

# Add a user and set permissions
RUN addgroup -S -g 1001 app && adduser -S -u 1001 -G app app
USER app

WORKDIR /app
COPY --from=builder --chown=app:app /app/dist ./dist
COPY --from=builder --chown=app:app /app/package.json ./package.json
COPY --from=builder --chown=app:app /app/yarn.lock ./yarn.lock
COPY --from=builder --chown=app:app /app/tsconfig.json ./tsconfig.json
RUN yarn install --production

EXPOSE 3000
CMD ["node", "dist/main.js"]