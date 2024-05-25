FROM node:18.18.0
WORKDIR /nestjs-cineflix
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]