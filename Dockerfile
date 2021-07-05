FROM node:14

RUN npm install -g https://github.com/zenodraft/zenodraft#0.10.0

ENTRYPOINT ["zenodraft"]
