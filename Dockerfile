FROM node:0.12.7
ENV APP_HOME /home/app/youtube
RUN mkdir -p $APP_HOME
ADD package.json $APP_HOME/
WORKDIR $APP_HOME
RUN npm install bower
RUN npm install http-server
RUN bower install
ADD . $APP_HOME

EXPOSE 80
CMD npm start

