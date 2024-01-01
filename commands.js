const staticData = require("./data/staticData");
const {GROUP_ID} = require("./data/keys");


const commands = {
    sendServices (chatId, bot) {
        const message = staticData.servicesName;
        bot.sendMessage(chatId, message, { reply_markup: staticData.servicesKeyboard });
    },
    sendMenu (chatId, bot) {
        const message = staticData.menuName;
        bot.sendMessage(chatId, message, { reply_markup: staticData.menuKeyboard });
    },
    sendInfo (chatId, bot) {
        const message = staticData.infoText;
        bot.sendMessage(chatId, message, { reply_markup: staticData.backMenuKeyboard });
    },
    sendNoCommand (chatId, bot){
        const message = staticData.noCommandText;
        bot.sendMessage(chatId, message, { reply_markup: staticData.backMenuKeyboard });
    },
    sendForm (msg, bot, service) {
        const message = `Пользователь @${msg.from.username} оставил заявку на ${service}\n${msg.text}
        `;
        bot.sendMessage(GROUP_ID, message);
    }
}

module.exports = commands