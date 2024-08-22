FROM node:18-slim

# RUN apt-get update && apt-get install wget -y

# USER node

WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install
# COPY . .
# COPY entrypoint.sh /usr/src/app/entrypoint.sh
# RUN chmod +x entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
