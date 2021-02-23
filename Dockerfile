FROM node:14

# Create app directory
WORKDIR /app

RUN git clone https://github.com/robKoh/Webprogrammierung.git .

#RUN npm ci
RUN npm install
Run npm ci

EXPOSE 8080
CMD [ "node", "server.js" ]