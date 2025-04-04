FROM node:latest AS build

WORKDIR /app

ENV HOST=0.0.0.0

RUN npm cache clean --force
# Copy files from local machine to virtual directory in docker image
COPY . .

RUN npm install
RUN npm run build --prod

FROM nginx:latest

COPY --from=build /app/dist/portfolio-v2/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
