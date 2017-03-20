import { constants } from 'utu';

const platforms = {
  [constants.MESSENGER]: (message, botMessage) => (
    {
      message: message.text,
      rawMessage: {
        object: 'page',
        entry: [{
          time: message.timestamp,
          messaging: [{
            sender: {
              id: message.user,
            },
            timestamp: message.timestamp,
            message: message.text,
          }],
        }],
      },
      botMessage,
    }
  ),
  [constants.SLACK]: (message, botMessage) => (
    {
      message: message.text,
      rawMessage: message,
      botMessage,
    }
  ),
  [constants.ALEXA]: (message, botMessage) => (
    {
      message: message.alexa.getIntentName(),
      rawMessage: message.alexa,
      botMessage,
    }
  ),
  default: (message, botMessage) => (
    {
      message: message.text,
      rawMessage: message,
      botMessage,
    }
  ),
};

/**
 * Returns the message information from a botkit message
 * @param  {String}  platform the utu platform name
 * @param  {String}  message  the botkit message
 * @param  {Boolean} message  signifies if a message is from the bot or the user
 * @return {Object}           the message object for utu
 */
export default (platform, message, botMessage) => {
  const cb = platforms[platform] || platforms.default;

  return cb(message, botMessage);
};
