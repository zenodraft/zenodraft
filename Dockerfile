FROM node:16

RUN npm install -g zenodraft@0.13.1

WORKDIR data/

ENTRYPOINT ["zenodraft"]
