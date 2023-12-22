const data = require("./staticData");


const commands = {
    sendServices (chatId, bot) {
        const message = data.serviceName;
        bot.sendMessage(chatId, message, { reply_markup: data.servicesKeyboard });
    },
    sendMenu (chatId, bot) {
        const message = data.menuName;
        bot.sendMessage(chatId, message, { reply_markup: data.menuKeyboard });
    },
    sendChannel (chatId, bot) {
        const message = data.channelText;
        bot.sendMessage(chatId, message, { reply_markup: data.backMenuKeyboard });
    },
    sendInfo (chatId, bot) {
        const message = data.infoText;
        bot.sendMessage(chatId, message, { reply_markup: data.backMenuKeyboard });
    },
    sendStart (chatId, bot) {
        const message = data.startText;
        bot.sendMessage(chatId, message, { reply_markup: data.backMenuKeyboard });
    }
}

module.exports = commands