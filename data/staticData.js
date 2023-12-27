const keys = require("./keys");


const data = {
    backMenuName: "💼 Меню",

    servicesName: '💳 Выберите услугу:',

    formText: "Заполните форму для заявки \n1.В какой комнате состоишь\n2.Сылка на команду",

    agreementText: "Перед подачей заявки вы соглашаетесь с тем что Администрация канала не несет ответственность за локи, процент лока обсуждается . После подачи заявки вы должны будете дать админам доступ в команду чтобы мы убедились что вы занимаете должность Вбивер/Тс",
    agreementCommand: "✅ Принять согласие",

    prevName: "🔙 Назад",

    menuName: 'Выберите опцию:',
    menuServices: "💳 Услуги",
    menuInfo: "🌐 Инфо",

    infoText: "Здесь будет информация",
    thxText: "Заявка отправлена. Ожидайте дальнейших инструкций",
    noCommandText: "Такой команды нет, воспользуйтесь меню",

    botCommands:{
        menu: "/menu",
        info: "/info",
        services: "/services",
        start: "/start"
    },

    servicesCommands:{
        accsGeo: "📍 Счета Гео",
        merch: "🏬 Мерчи",
        acquiring: "🏪 Заявка на эквайринг",
    }
};

data.servicesList = [
    { name: data.servicesCommands.accsGeo, description: 'Название банка' },
    { name: data.servicesCommands.merch, description: 'Название мерча (количество)' },
    { name: data.servicesCommands.acquiring, description: 'Правила' },
    { name: data.backMenuName, description: "Вернуться в меню" },
]

data.backMenuList = [
    { name: data.backMenuName, description: "Вернуться в меню" },
]

data.prevList = [
    { name: data.prevName, description: "Назад"}
]

data.agreementList = [
    { name: data.agreementCommand, description: "Согласие" },
]

data.menuList = [
    { name: data.menuServices, description: "Список услуг" },
    { name: data.menuInfo, description: "Информация о нас" },
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

