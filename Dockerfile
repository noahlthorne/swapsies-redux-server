FROM node
RUN mkdir -p /usr/src/
WORKDIR /usr/src/
COPY package*.json ./
RUN npm cache clean --force
RUN npm install && npm install tsc -g
COPY . /usr/src/
EXPOSE 5000 49153

CMD [ "npm", "start" ]
