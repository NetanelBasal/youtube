FROM node:0.12.7
RUN npm install bower -g
RUN npm install http-server -g
RUN bower install
RUN npm install

ENV PORT 8080
EXPOSE 8080
CMD http-server -p 8080