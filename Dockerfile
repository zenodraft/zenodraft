FROM node:16

RUN npm install -g zenodraft@0.13.2

WORKDIR data/

ENTRYPOINT ["zenodraft"]
