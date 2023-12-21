const data = require("./staticData");


const commands = {
    sendServicesMessage (chatId, bot) {
        const message = data.serviceName;
        bot.sendMessage(chatId, message, { reply_markup: data.servicesKeyboard });
    },
    sendMenu (chatId, bot) {
        const message = data.menuName;
        bot.sendMessage(chatId, message, { reply_markup: data.menuKeyboard });
    }
}

module.exports = commands