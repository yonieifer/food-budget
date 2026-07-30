FROM node:24-alpine
WORKDIR /app
COPY node_modules .
RUN npm install 
COPY . .
CMD ["npm", "RUN", "dev"]
EXPOSE 3000
