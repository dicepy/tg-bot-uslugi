const TelegramBot = require('node-telegram-bot-api');
const checkUser = require("./checkUser");
const keys = require("./keys");
const commands = require("./commands");
const callbackHandler = require("./callbackHandler");
const data = require("./staticData");

const bot = new TelegramBot(keys.TOKEN, { polling: true });

const sendServicesMessage = commands.sendServicesMessage;

// Очередь сообщений для предотвращения спама
const messageQueue = new Map();

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    try {
        // Проверка на количество сообщений в секунду
        if (!messageQueue.has(userId)) {
            messageQueue.set(userId, 1);
            setTimeout(() => {
                messageQueue.delete(userId);
            }, 1000); // Ограничение на 1 сообщение в секунду
        } else {
            bot.sendMessage(chatId, `Защита от спама, напишите еще раз`);
            return;
        }

        checkUser(keys.CHANNEL_ID, userId, bot)
            .then((status) => {
                if (status) {
                    commands.sendMenu(chatId, bot)
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
    switch (callbackQuery.message.text) {
        case data.serviceName:
            if (callbackQuery.data === data.backMenuName){
                callbackHandler.back(callbackQuery,bot);
            } else{
                callbackHandler.services(callbackQuery, bot, keys.GROUP_ID);
            }
            break;
        case data.menuName:
            callbackHandler.menu(callbackQuery,bot);
            break;
        case data.infoText:
        case data.channelText:
        case data.thxText:
            callbackHandler.back(callbackQuery,bot);
            break;
    }
});
