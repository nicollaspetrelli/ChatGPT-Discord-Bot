require('dotenv').config();

const preferences = {
    "guildId": "ChannelId",
};

// Discord
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// OpenIA
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configuration);

client.on('messageCreate', async (message) => {
    try {
        if (message.author.bot) return;

        const guildId = message.guild.id;
        const channelId = message.channel.id;

        if (preferences[guildId] !== channelId) return;

        const gptResponse = await openai.createCompletion({
            model: 'davinci',
            prompt: `ChatGPT is a friendly chatbot.\n\
                    Users: você pode falar portugues?\n\
                    ChatGPT: Sim, vamos falar em portugues agora\n\
                    ${message.author.username}: \n\
                    ChatGPT:`,
            temperature: 0.9,
            max_tokens: 100,
            stop: ['ChatGPT:', "Nicollas Dev:"],
        })

        message.reply(`${gptResponse.data.choices[0].text}`)
    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.DISCORD_TOKEN);
console.log('Bot is running...');
