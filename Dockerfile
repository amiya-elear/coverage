##================================================================================#
##********************************************************************************#
 # @fileOverview Dokerfile - to run the server in Docker.
 # @author Narendra Kumar Agarwal, narendra@elear.solutions
 # @copyright Copyright (c) 2017 Elear Solutions Tech Private Limited. All rights
 # reserved.
 # @license To any person (the "Recipient") obtaining a copy of this software and
 # associated documentation files (the "Software"):
 #
 # All information contained in or disclosed by this software is confidential
 # and proprietary information of Elear Solutions Tech Private Limited and all
 # rights therein are expressly reserved. By accepting this material the
 # recipient agrees that this material and the information contained therein is
 # held in confidence and in trust and will NOT be used, copied, modified,
 # merged, published, distributed, sublicensed, reproduced in whole or in part,
 # nor its contents revealed in any manner to others without the express
 # written permission of Elear Solutions Tech Private Limited.
##********************************************************************************#
##================================================================================#
FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --only=production

# Bundle app source
COPY dist/. /usr/src/app/dist/

EXPOSE 8080
CMD [ "npm", "start" ]
