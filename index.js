const TelegramBot = require('node-telegram-bot-api');
const checkUser = require("./checkUser");
const keys = require("./keys");
const commands = require("./commands");
const callbackHandler = require("./callbackHandler");


const bot = new TelegramBot(keys.TOKEN, { polling: true });

const sendServicesMessage = commands.sendServicesMessage;

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    try {
        checkUser(keys.CHANNEL_ID, userId, bot)
            .then((status) => {
                if (status){
                    sendServicesMessage(chatId, bot)
                } else {
                    bot.sendMessage(chatId, `Чтобы воспользоваться ботом, подпишитесь на наш канал. ${keys.INVITE}`);
                }
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
    } catch (e) {
        console.log("error " + e);
    }
});



bot.on('callback_query', (callbackQuery) => {
    switch (callbackQuery.message.text){
        case "Выберите услугу:":
            callbackHandler.services(callbackQuery, bot, keys.GROUP_ID)
            break;
    }

});