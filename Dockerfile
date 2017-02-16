FROM node
RUN useradd -ms /bin/bash node
ADD . /home/node/app
RUN chown -R node:node /home/node
USER node
ENV HOME /home/node
WORKDIR /home/node/app
# RUN npm install
