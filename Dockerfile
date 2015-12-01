FROM node:0.12.7
ADD package.json $APP_HOME/
RUN npm install bower
RUN npm install http-server

RUN npm start

EXPOSE 80
