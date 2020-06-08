const config = require('config');
const TelegramBot = require('node-telegram-bot-api');
const request = require('request');

const TOKEN = config.get('token');

const bot = new TelegramBot(TOKEN, {polling:true});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "This bot helps to chose random beer",{
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Get Bear', callback_data: 'random'}
                ]
            ]
        }
    });
});

bot.on('callback_query', query => {
    if(query.data === "random")
    {
        request(
            config.get('random'), (error, response, body) => {

                const data = JSON.parse(body)[0];

                bot.sendMessage(query.message.chat.id, 
                    `Name : ${data.name}\nTagline: ${data.tagline}\n First brewed: ${data.first_brewed}\nDescription ${data.description}`
                    );

                const pic_stream = request.get(data.image_url).on('error', err => console.log(err));

                bot.sendPhoto(query.message.chat.id, pic_stream); 
            });
    }
});