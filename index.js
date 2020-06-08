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

