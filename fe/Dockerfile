# stage: 1
FROM node:12-alpine AS build
WORKDIR /usr/app
COPY package.json .
ARG ENV
RUN echo “Building for ${ENV}
COPY . .
RUN npm i
RUN npm run build
# stage: 2 — the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/build /usr/share/nginx/html
EXPOSE 80
# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
# Add bash
RUN apk add --no-cache bash
# Make our shell script executable
#CMD ["nginx", "-g", "daemon off;"]
# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
