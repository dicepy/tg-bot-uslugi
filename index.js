const TelegramBot = require('node-telegram-bot-api');
const checkUser = require("./checkUser");
const keys = require("./keys");
const commands = require("./commands");
const callbackHandler = require("./callbackHandler");

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
                    switch (msg.text) {
                        case '/start':
                            bot.sendMessage(chatId, `Приветствие`);
                            break;
                        case '/info':
                            bot.sendMessage(chatId, `Здесь какая-то информация`);
                            break;
                        case '/services':
                            commands.sendServicesMessage(chatId, bot);
                            break;
                        case '/channel':
                            bot.sendMessage(chatId, `Ссылка на наш канал ${keys.INVITE}`);
                            break;
                        default:
                            bot.sendMessage(chatId, `Неизвестная команда, используйте меню`);
                    }
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
        case "Выберите услугу:":
            callbackHandler.services(callbackQuery, bot, keys.GROUP_ID);
            break;
    }
});
