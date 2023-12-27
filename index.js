const TelegramBot = require('node-telegram-bot-api');
const checkUser = require("./checkUser");
const keys = require("./data/keys");
const commands = require("./commands");
const callbackHandler = require("./callbacks");
const staticData = require("./data/staticData");

const bot = new TelegramBot(keys.TOKEN, { polling: true });

const messageQueue = new Map();
const agreementQueue = new Map();

const chechAgree = (agreementQueue, userId) => {
    if (agreementQueue.has(userId)) {
        agreementQueue.delete(userId)
    }
}

bot.on('message', (msg) => {
    console.log(msg)
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

        checkUser(keys.CHANNEL_ID_1,keys.CHANNEL_ID_2, userId, bot)
            .then((status) => {
                if (status) {
                        switch (msg.text){
                            case staticData.botCommands.menu:
                            case staticData.botCommands.start:
                                chechAgree(agreementQueue, userId)
                                commands.sendMenu(chatId, bot)
                                break;
                            case staticData.botCommands.services:
                                chechAgree(agreementQueue, userId)
                                commands.sendServices(chatId,bot)
                                break;
                            case staticData.botCommands.info:
                                chechAgree(agreementQueue, userId)
                                commands.sendInfo(chatId,bot)
                                break;
                            default:
                                if (agreementQueue.has(userId)){
                                    commands.sendAcquiringForm(msg, bot)
                                    bot.sendMessage(chatId,staticData.thxText)
                                    agreementQueue.delete(userId)
                                    commands.sendMenu(chatId,bot)
                                } else {
                                    commands.sendNoCommand(chatId,bot)
                                }
                                break;
                        }
                } else {
                    bot.sendMessage(chatId, `Чтобы воспользоваться ботом, подпишитесь на наши канал. \n${keys.INVITE_1}\n${keys.INVITE_2}`);
                }
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
    } catch (e) {
        bot.sendMessage(chatId, `Возникла непредвиденная ошибка, обратитесь к администратору`);
    }
});

bot.on('callback_query', (callbackQuery) => {
    console.log(callbackQuery)
    checkUser(keys.CHANNEL_ID_1,keys.CHANNEL_ID_2, callbackQuery.from.id, bot)
        .then((status) => {
            if (status) {
                switch (callbackQuery.message.text) {
                    case staticData.servicesName:
                        if (callbackQuery.data === staticData.backMenuName){
                            callbackHandler.backToMenu(callbackQuery,bot);
                        } else{
                            callbackHandler.services(callbackQuery, bot, keys.GROUP_ID);
                        }
                        break;
                    case staticData.menuName:
                        callbackHandler.menu(callbackQuery,bot);
                        break;
                    case staticData.servicesCommands.accsGeo:
                        if (callbackQuery.data === staticData.backMenuName){
                            callbackHandler.backToMenu(callbackQuery,bot);
                        } else if (callbackQuery.data === staticData.prevName) {
                            callbackHandler.backToServices(callbackQuery, bot)
                        } else {
                            callbackHandler.accsGeo(callbackQuery, bot, keys.GROUP_ID)
                        }
                        break;
                    case staticData.servicesCommands.merch:
                        if (callbackQuery.data === staticData.backMenuName){
                            callbackHandler.backToMenu(callbackQuery,bot);
                        } else if (callbackQuery.data === staticData.prevName) {
                            callbackHandler.backToServices(callbackQuery, bot)
                        }else{
                            callbackHandler.merch(callbackQuery, bot, keys.GROUP_ID)
                        }
                        break;
                    case staticData.agreementText:
                        if (callbackQuery.data === staticData.backMenuName){
                            callbackHandler.backToMenu(callbackQuery,bot);
                        } else if (callbackQuery.data === staticData.prevName) {
                            callbackHandler.backToServices(callbackQuery, bot)
                        }else{
                            agreementQueue.set(callbackQuery.from.id, 1);
                            callbackHandler.acquiring(callbackQuery, bot, keys.GROUP_ID)
                        }
                        break;
                    case staticData.formText:
                        if (callbackQuery.data === staticData.backMenuName){
                            chechAgree(agreementQueue, callbackQuery.from.id)
                            callbackHandler.backToMenu(callbackQuery,bot);
                        } else if (callbackQuery.data === staticData.prevName) {
                            chechAgree(agreementQueue, callbackQuery.from.id)
                            callbackHandler.backToServices(callbackQuery, bot)
                        }else {
                            callbackHandler.backToMenu(callbackQuery,bot);
                        }
                        break;
                    case staticData.noCommandText:
                    case staticData.infoText:
                    case staticData.thxText:
                        callbackHandler.backToMenu(callbackQuery,bot);
                        break;
                }
            } else {
                bot.sendMessage(callbackQuery.message.chat.id, `Чтобы воспользоваться ботом, подпишитесь на наши канал. \n${keys.INVITE_1}\n${keys.INVITE_2}`);
            }
        })
        .catch((error) => {
            console.log("Error: " + error);
        });
});

module.exports = agreementQueue;



