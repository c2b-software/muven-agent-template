FROM keymetrics/pm2:13-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY dist/ ./dist
COPY pm2.json ./
COPY tsconfig.json ./
COPY node_modules ./node_modules
COPY env/ ./env

EXPOSE 3000

CMD [ "pm2-runtime", "start", "pm2.json" ]

#docker build --rm -f "Dockerfile" -t registry.c2bsoftware.com.br/muven-agent-tray:latest .
#docker push registry.c2bsoftware.com.br/muven-agent-tray:latest


#
# DEV
#
#docker build --rm -f "Dockerfile" -t registry.c2bsoftware.com.br/muven-agent-tray:dev .
#docker push registry.c2bsoftware.com.br/muven-agent-tray:dev