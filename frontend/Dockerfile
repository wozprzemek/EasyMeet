FROM node:18-alpine AS front

WORKDIR /frontend
COPY . .
# RUN if [ "$mode" = "dev" ] ; then npm install ; else npm ci --only=production ; fi
RUN npm install && npm run build
# read environmental variable for API host
# ARG REACT_APP_API_BASE_URL
# ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL

# RUN npm run build
# RUN if [ "$mode" = "dev" ] ; then npm start; else npm run build ; fi


FROM nginx:alpine
WORKDIR /frontend
COPY --from=front /frontend/build .
COPY nginx.conf /etc/nginx/nginx.conf