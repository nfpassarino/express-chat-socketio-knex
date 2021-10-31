const fileContainer = require('../FileContainer');

const config = require('knex') ({
    client: 'sqlite3',
    connection: {
        filename: './..'
    }
});

exports.fetchAllMessages = async () => {
    const messageContainer = new fileContainer(config, 'messages');
    return messageContainer.getAll();
};

exports.writeNewMessage = async (newMessage) => {
    const messageContainer = new fileContainer(config, 'messages');
    const message = await messageContainer.save(newMessage);
    return message;
};
