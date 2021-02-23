FROM node:14

# Create app directory
WORKDIR /app

RUN git clone https://github.com/robKoh/Webprogrammierung.git#feature/niklas-matthias-html .

RUN npm ci

EXPOSE 8080
CMD [ "node", "server.js" ]