# FROM redis:latest
# EXPOSE 6379
# CMD ["redis-server", "./config/redis-conf"]

FROM node:current-slim
# Create app directory
WORKDIR /home/adamundus/macappapi
# Install app dependencies
# Copy app source code
COPY . .

RUN npm install --silent

#Expose port and start application

EXPOSE 3001
CMD ["npm", "start" ]