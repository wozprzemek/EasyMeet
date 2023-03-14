FROM node:18-alpine

WORKDIR /frontend
COPY package*.json ./
RUN if [ "$mode" = "dev" ] ; then npm install ; else npm ci --only=production ; fi

# read environmental variable for API host
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL

COPY . .

# RUN npm run build
RUN if [ "$mode" = "dev" ] ; then npm start; else npm run build ; fi
