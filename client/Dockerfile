# ---------- Stage 1: Build ----------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- Stage 2: Serve ----------
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]