FROM node:18-alpine

WORKDIR /backend

COPY package*.json ./

RUN if [ "$mode" = "dev" ] ; then npm install ; else npm ci --only=production ; fi

COPY . .

EXPOSE 8000