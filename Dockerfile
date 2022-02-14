FROM node:14

RUN npm install -g zenodraft@0.11.1

ENTRYPOINT ["zenodraft"]
