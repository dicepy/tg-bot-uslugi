const keys = require("./keys");
const commands = require("./commands");
const data = require("./staticData");
const callbackHandler = {
    services (callbackQuery, bot, group_id) {
        const message = `Пользователь @${callbackQuery.from.username} хочет купить услугу: ${callbackQuery.data}`;
        bot.sendMessage(group_id, message);
        bot.editMessageText(data.thxText, {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id,
            reply_markup: data.backMenuKeyboard
        });
    },
    menu (callbackQuery,bot){
        const optionName = callbackQuery.data;
        switch (optionName){
            case data.menuService:
                bot.editMessageText(data.serviceName, {
                    chat_id: callbackQuery.message.chat.id,
                    message_id: callbackQuery.message.message_id,
                    reply_markup: data.servicesKeyboard
                });
                break;
            case data.menuInfo:
                bot.editMessageText(data.infoText, {
                    chat_id: callbackQuery.message.chat.id,
                    message_id: callbackQuery.message.message_id,
                    reply_markup: data.backMenuKeyboard
                });
                break;
            case data.menuChannel:
                bot.editMessageText(data.channelText, {
                    chat_id: callbackQuery.message.chat.id,
                    message_id: callbackQuery.message.message_id,
                    reply_markup: data.backMenuKeyboard
                });
                break;
        }
    },
    back (callbackQuery,bot) {
        bot.editMessageText(data.menuName, {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id,
            reply_markup: data.menuKeyboard
        });
    }
}

module.exports = callbackHandler;