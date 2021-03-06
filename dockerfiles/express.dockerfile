FROM node:14.1.0-stretch-slim
# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
# ワイルドカードを使用して、package.json と package-lock.json の両方が確実にコピーされるようにします。
# 可能であれば (npm@5+)
COPY express/package.json ./
COPY express/yarn.lock ./

RUN npm install
# 本番用にコードを作成している場合
# RUN npm install --only=production

EXPOSE 8080
CMD yarn start