FROM node:lts-alpine
ENV TZ="Asia/Istanbul"
WORKDIR /lgw
COPY . .
# RUN npm i -g @vue/cli
RUN rm -rf node_modules package-lock.json && npm install
# RUN npm run build -- --mode production
EXPOSE 8080
#CMD ["live-server","dist"]
# RUN npm install -g live-server
# CMD live-server --port=3434 --entry-file=./index.html dist/
CMD node app/app.js

# docker run -p 8080:8080 --name lgw1 -it lgw1
# docker build -t lgw1 .