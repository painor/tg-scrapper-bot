const { TelegramClient, Api} = telegram;
const { StringSession } = telegram.sessions;
const { NewMessage } = TelegramClient.events;
const teleSession = SETTINGS.TELESESSION;
const api_id = parseInt(SETTINGS.TELEGRAM_APP_ID);
const api_hash = SETTINGS.TELEGRAM_APP_HASH;
const phone_number = SETTINGS.TELEGRAM_PHONE_NUMBER;
let client = false;

const stringSession = new StringSession(teleSession);

const authenticate = async () => {
    await client.start({
        phoneNumber: async () => phone_number,
        password: async () => await prompt('input your password'),
        phoneCode: async () => await prompt('input your code'),
        onError: (err) => console.log(err),
    });
    let session = client.session.save();
    console.log(session);
    return true;
}

const getAllChats = async () => {
    return await client.invoke(
        new Api.messages.GetHistory({
            peer: 'testonlyalgaroow',
            offsetId: -0,
            addOffset: -0,
            limit: 1,
        })
    );
    // console.log(result);
}

const getMessageEvent = (event) => {
    let data = event.message;
    console.log(data);
    Handler.appendScannerTextarea(data.text);
}

const grab = async () => {
    try {
        Handler.appendScannerTextarea('Login with phone : '+phone_number+' ');
        client = new TelegramClient(stringSession, api_id, api_hash, { connectionRetries: 5 });
        await client.connect();
        const me = await client.getMe();
        Handler.appendScannerTextarea('now you should be connected '+me.username);
        client.addEventHandler(getMessageEvent, new NewMessage({chats: [-1001618359068,-1001519789792,-1001747246894]})); //testing 1747246894
    } catch (err) {
        console.log(err);
        return false;
    }
    return client;
};

// module.exports = {
//     authenticate,
//     getMessageEvent,
//     grab
// }


