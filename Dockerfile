# ---------- BUILD STAGE ----------
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ---------- RUNTIME STAGE ----------
FROM nginx:alpine

# REMOVE default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# COPY our nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY Vite build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
