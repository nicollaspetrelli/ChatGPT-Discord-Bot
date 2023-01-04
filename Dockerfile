FROM node:19.3.0

# Create the bot's directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Install the bot's dependencies
COPY package.json /usr/src/bot
RUN npm install

# Copy the bot's source code
COPY . /usr/src/bot

# Start the bot.
CMD ["node", "index.js"]