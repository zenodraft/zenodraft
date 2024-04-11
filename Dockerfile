FROM node:20

RUN npm install -g zenodraft@0.14.1

WORKDIR data/

ENTRYPOINT ["zenodraft"]
