
# -------------------------------
# 1. Build Stage
# -------------------------------
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# -------------------------------
# 2. Production Stage (Serve via Nginx)
# -------------------------------
FROM nginx:alpine

# Copy React build to Nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy default nginx config (optional)
# You can remove this if not needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


