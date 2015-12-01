FROM node:0.12.7
ADD package.json $APP_HOME/
RUN npm install bower
RUN npm install http-server

EXPOSE 80
CMD npm start

