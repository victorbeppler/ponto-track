FROM node:18-alpine


WORKDIR /app
COPY package.json .
RUN npm i
COPY . .

RUN mkdir -p node_modules/.vite
## EXPOSE [Port you mentioned in the vite.config file]
CMD ["npm", "run", "dev"]