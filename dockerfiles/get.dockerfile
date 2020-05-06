FROM node:14.1.0-stretch-slim
RUN npm init next-app nextjs-get --example "https://github.com/zeit/next-learn-starter/tree/master/learn-starter"
WORKDIR /nextjs-get/
EXPOSE 4000
CMD yarn dev