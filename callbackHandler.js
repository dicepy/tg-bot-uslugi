const keys = require("./keys");
const callbackHandler = {
    services (callbackQuery, bot, group_id) {
        const chatId = callbackQuery.message.chat.id;
        const userId = callbackQuery.from.id;
        const messageId = callbackQuery.message.message_id; // ID сообщения, которое нужно отредактировать
        const serviceName = callbackQuery.data;
        // Отправляем сообщение в группу с информацией о покупке
        const message = `Пользователь @${callbackQuery.from.username} хочет купить услугу: ${serviceName}`;

        // Отправляем сообщение в группу
        bot.sendMessage(group_id, message);

        // Редактируем сообщение пользователя, удаляя клавиатуру
        bot.editMessageText(`Спасибо за покупку услуги: ${serviceName}. Ожидайте дальнейших инструкций.`, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: { inline_keyboard: [] }
        });
    }
}

module.exports = callbackHandler;