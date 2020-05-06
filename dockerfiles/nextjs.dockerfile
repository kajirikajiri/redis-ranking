FROM node:14.1.0-stretch-slim
WORKDIR /nextjs/

COPY nextjs/package.json ./
COPY nextjs/yarn.lock ./

EXPOSE 4000
CMD yarn dev