# Documentation of the bot

This project is a simple (very very simple) discord bot that implements a OpenAI ChatGPT to answer questions.
Also is a bootstrap to start a chatbot with OpenAI.

## Requirements

- NodeJS v19.3.0 (npm v9.2.0)

## Install

- Clone the repository
- Install the dependencies with `npm install`
- Create a `.env` file following the `.env.example` file
- Fill the `.env` file with your OpenAI API Key and Discord Bot Token
- Run the bot with `node index.js`

If you are familiar with docker, you can run the bot with docker compose, just run `docker-compose up -d` and the bot will be running.

## Usage

- In index.js file in line 3 you can set what channel in what guild the bot will listen to, set your guild id and channel id like in the example below:

```js
const preferences = {
    "guildId": "ChannelId",
};
```

- Now go to your discord server and the channel of your choice and starting talking with bot.

## Other information

This repository has another branch with database implementation using supabase, but is under development.
If you want to contribute to this project, feel free to open a pull request.

Any questions, feel free to call me on [Discord](https://nicollas.dev/go/discord)
