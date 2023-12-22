const keys = require("./keys");


const data = {
    backMenuName: "💼 Меню",
    channelText: `${keys.INVITE}`,
    serviceName: '💳 Выберите услугу:',
    menuName: 'Выберите опцию:',
    menuService: "💳 Услуги",
    menuInfo: "🌐 Инфо",
    menuChannel: "ℹ️ Канал",
    infoText: "Здесь будет информация",
    thxText: "Заявка отправлена. Ожидайте дальнейших инструкций",
    startText: "Приветствие на start",
    botCommands:{
        start: "/start",
        menu: "/menu",
        info: "/info",
        services: "/services",
        channel: "/channel"

    }
};

data.servicesList = [
    { name: 'Услуга 1', description: 'Описание услуги 1' },
    { name: 'Услуга 2', description: 'Описание услуги 2' },
    { name: data.backMenuName, description: "Вернуться назад" },
]

data.backMenuList = [
    { name: data.backMenuName, description: "Вернуться назад" },
]

data.menuList = [
    { name: data.menuService, description: "Список услуг" },
    { name: data.menuInfo, description: "Информация о нас" },
    { name: data.menuChannel, description: "Ссылка на канал" },
]



data.backMenuKeyboard = {
    inline_keyboard: data.backMenuList.map((service) => [
        { text: service.name, callback_data: service.name },
    ]),
};

data.servicesKeyboard = {
    inline_keyboard: data.servicesList.map((service) => [
        { text: service.name, callback_data: service.name },
    ]),
};

data.menuKeyboard = {
    inline_keyboard: data.menuList.map((command) => [
        { text: command.name, callback_data: command.name },
    ]),
};

module.exports = data;

