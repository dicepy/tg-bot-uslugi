const staticData = require("./data/staticData");
const availableServices = require("./data/availableServices")
const callbacks = {
    services (callbackQuery, bot) {
        switch (callbackQuery.data){
            case staticData.servicesCommands.accsGeo:
                bot.editMessageText(staticData.servicesCommands.accsGeo, {
                    chat_id: callbackQuery.message.chat.id,
                    message_id: callbackQuery.message.message_id,
                    reply_markup: {
                        inline_keyboard: [
                            ...availableServices.accsGeo.map(item => [
                                { text: item, callback_data: item }
                            ]),
                            ...staticData.prevList.map(service => [
                                { text: service.name, callback_data: service.name }
                            ]),
                            ...staticData.backMenuList.map(service => [
                                { text: service.name, callback_data: service.name }
                            ]),

                        ]
                    }

                });
                break;
            case staticData.servicesCommands.merch:
            case staticData.servicesCommands.acquiring:
                bot.editMessageText(staticData.agreementText, {
                    chat_id: callbackQuery.message.chat.id,
                    message_id: callbackQuery.message.message_id,
                    reply_markup: {
                        inline_keyboard: [
                            ...staticData.agreementList.map(item => [
                                { text: item.name, callback_data: item.name }
                            ]),
                            ...staticData.prevList.map(service => [
                                { text: service.name, callback_data: service.name }
                            ]),
                            ...staticData.backMenuList.map(service => [
                                { text: service.name, callback_data: service.name }
                            ])
                        ]
                    }
                });
                break;

        }

    },
    menu (callbackQuery,bot){
        const optionName = callbackQuery.data;
        switch (optionName){
            case staticData.menuServices:
                bot.editMessageText(staticData.servicesName, {
                    chat_id: callbackQuery.message.chat.id,
                    message_id: callbackQuery.message.message_id,
                    reply_markup: staticData.servicesKeyboard
                });
                break;
            case staticData.menuInfo:
                bot.editMessageText(staticData.infoText, {
                    chat_id: callbackQuery.message.chat.id,
                    message_id: callbackQuery.message.message_id,
                    reply_markup: staticData.backMenuKeyboard
                });
                break;
        }
    },
    accsGeo (callbackQuery,bot, group_id) {
        const message = `Пользователь @${callbackQuery.from.username} оставил заявку на ${staticData.servicesCommands.accsGeo}: ${callbackQuery.data}`;
        bot.sendMessage(group_id, message);
        bot.editMessageText(staticData.thxText, {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id,
            reply_markup: staticData.backMenuKeyboard
        });
    },
    form (callbackQuery,bot){
        bot.editMessageText(staticData.formText, {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id,
            reply_markup: {
                inline_keyboard: [
                    ...staticData.prevList.map(service => [
                        { text: service.name, callback_data: service.name }
                    ]),
                    ...staticData.backMenuList.map(service => [
                        { text: service.name, callback_data: service.name }
                    ]),

                ]
            }
        });
    },
    backToMenu (callbackQuery, bot) {
        bot.editMessageText(staticData.menuName, {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id,
            reply_markup: staticData.menuKeyboard
        });
    },
    backToServices (callbackQuery, bot) {
        bot.editMessageText(staticData.servicesName, {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id,
            reply_markup: staticData.servicesKeyboard
        });
    },
}

module.exports = callbacks;