// Create a Discord Bot using OpenAI API that interacts on the Discord Server
require('dotenv').config();

// Supabase
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

//Discord
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

        const { data, error } = await supabase
            .from('preferences')
            .select('guild, channel')
            .eq('guild', guildId)

        const prefferedChannelForThisGuild = data[0]?.channel;

        if (message.content === '!setup') {
            if (prefferedChannelForThisGuild) {
                message.reply(`This server is already setup. You can use <#${prefferedChannelForThisGuild}> to chat with the bot.`);
                return;
            }

            const { error } = await supabase
                .from('preferences')
                .insert([
                    { guild: guildId, channel: channelId }
                ])

            console.log('Supabase create new insert in table preferences', error);

            if (error) {
                console.log(error);
                message.reply('There was an error setting up the bot. Please try again later.');
                return;
            }

            message.reply('Bot is setup successfully. Now you can use this channel to chat with the bot.');
            return;
        }

        if (error) {
            console.log(error);
            return;
        }

        console.log('Supabase Response', data);

        if (data.length === 0) {
            message.reply('This server is not setup yet. Use the command !setup in the channel that you want to talk with me.');

            return;
        }

        if (data[0].channel !== message.channel.id) {
            return;
        }

        const gptResponse = await openai.createCompletion({
            model: 'davinci',
            prompt: `ChatGPT is a friendly chatbot.\n\
Users: você pode falar portugues?\n\
ChatGPT: Sim, vamos falar em portugues agora\n\
${message.author.username}: ${message.content}\n\
ChatGPT:`,
            temperature: 0.9,
            max_tokens: 100,
            stop: ['ChatGPT:', "Nicollas Dev:"],
        })

        message.reply(`${gptResponse.data.choices[0].text}`)
    } catch (error) {
        console.log(error);
        console.log(error.response.data)
    }
});

client.login(process.env.DISCORD_TOKEN);
console.log('Bot is running...');
