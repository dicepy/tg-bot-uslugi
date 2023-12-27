const checkUser = async (CHANNEL_ID_1, CHANNEL_ID_2, userId, bot) => {
    try {
        // Getting the ChatMember for the first channel
        const chatMember1 = await bot.getChatMember(CHANNEL_ID_1, userId);

        // Getting the ChatMember for the second channel
        const chatMember2 = await bot.getChatMember(CHANNEL_ID_2, userId);

        // Checking membership status for both channels
        const isMemberChannel1 = chatMember1.status === 'member' || chatMember1.status === 'administrator' || chatMember1.status === 'creator';
        const isMemberChannel2 = chatMember2.status === 'member' || chatMember2.status === 'administrator' || chatMember2.status === 'creator';

        // Returning true only if the user is a member in both channels
        return isMemberChannel1 && isMemberChannel2;
    } catch (error) {
        console.error(error.message);
        throw error; // Re-throw the error to be caught in the calling code
    }
};

module.exports = checkUser;
