const commands = {
    sendServicesMessage (chatId, bot) {
        const services = [
            { name: 'Услуга 1', description: 'Описание услуги 1' },
            { name: 'Услуга 2', description: 'Описание услуги 2' },
        ];

        const keyboard = {
            inline_keyboard: services.map((service) => [
                { text: service.name, callback_data: service.name },
            ]),
        };

        const message = 'Выберите услугу:';
        bot.sendMessage(chatId, message, { reply_markup: keyboard });
    },

}

module.exports = commands