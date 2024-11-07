FROM node:alpine As development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .


FROM node:alpine
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/tsconfig*.json ./
COPY --from=development /usr/src/app/package*.json ./
COPY --from=development /usr/src/app/src ./src
COPY --from=development /usr/src/app/test ./test/
COPY --from=development /usr/src/app/doc ./dist/doc/

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]