# Fetching the latest node image on alpine linux
FROM node:18.12.1 as build

ARG env=dev

# Make directory
RUN mkdir ./app

# Setting up the work directory
WORKDIR ./app

COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build ./app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]