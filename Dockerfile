FROM node:14

RUN npm install -g https://github.com/zenodraft/zenodraft#0.8.0

ENTRYPOINT ["zenodraft"]
