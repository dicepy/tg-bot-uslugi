const checkUser = (CHANNEL_ID, userId, bot) => {
    // Returning the Promise directly
    return bot.getChatMember(CHANNEL_ID, userId)
        .then((chatMember) => {
            return chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator';
        })
        .catch((error) => {
            console.error(error.message);
            throw error; // Re-throw the error to be caught in the calling code
        });
}

module.exports = checkUser;
