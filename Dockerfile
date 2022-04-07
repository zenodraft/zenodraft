FROM node:14

RUN npm install -g zenodraft@0.12.0

ENTRYPOINT ["zenodraft"]
