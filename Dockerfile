FROM node:18-alpine3.15

WORKDIR C:/Users/Dell/tweetapp

ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]