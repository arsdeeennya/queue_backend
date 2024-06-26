# Base image
FROM node:20

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY prisma ./prisma

RUN npx prisma generate
# RUN npx prisma migrate deploy
# Bundle app source
COPY . .

# Copy the .env and .env.development files
# COPY .env
# VOLUME . /app
# Creates a "dist" folder with the production build
# RUN npm run build

# Expose the port on which the app will run
# EXPOSE 3001
EXPOSE 3001

# Start the server using the production build
RUN ["npm", "run", "build"]
CMD ["npm", "run", "start:prod"]
#CMD ["npm", "run", "start:dev"]