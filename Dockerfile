FROM node:14

#Create app directory
WORKDIR /app

RUN git clone https://github.com/robKoh/Webprogrammierung.git .

RUN npm install

EXPOSE 8080
CMD [ "node", "server.js" ]

#Local build
#FROM node:14

# Create app directory
#WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

#RUN npm ci
#RUN npm install && npm ci
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY . .

#EXPOSE 8080
#CMD [ "node", "server.js" ]
