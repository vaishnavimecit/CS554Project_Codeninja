FROM node:current-slim
# Create app directory
WORKDIR /home/adamundus/macapp
# Install app dependencies
# Copy app source code
COPY package.json ./

RUN npm install --silent

COPY . .

#Expose port and start application
EXPOSE 3000
CMD [ "npm", "start" ]