FROM node:lts-alpine
ENV TZ="Asia/Istanbul"
WORKDIR /lgw
COPY . .
RUN rm -rf node_modules package-lock.json && npm install
# RUN npm install
EXPOSE 8080
CMD node app/app.js
# CMD npm run start
# docker run -p 8080:8080 --name lgw1 -it lgw1
# docker build -t lgw1 .