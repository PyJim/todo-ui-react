FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

FROM node:16-alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY --from=build /app/package*.json ./

EXPOSE 5173

CMD ["npm", "start"]