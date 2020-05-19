# FROM node:current-slim
# # Create app directory
# WORKDIR /home/adamundus/macapp
# # Install app dependencies
# # Copy app source code
# COPY package.json ./

# RUN npm install --silent

# COPY . .

# #Expose port and start application
# EXPOSE 3000
# CMD [ "npm", "start" ]

# build environment
FROM node:current-slim as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY conf /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]