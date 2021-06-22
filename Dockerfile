FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install && npm install tsc -g
COPY . /usr/src/app
EXPOSE 5000 49153

CMD [ "npm", "start" ]
