import getUTUPlatformName from './botkit-utu-platform-matrix';
import getMessageDataForPlatform from './get-platform-message';

/**
 * Higher order function that returns the botkit middleware function
 * for receiving incoming messages. This will translate the requirements
 * by botkit platform into the format needed for utu
 * @param  {Object} utu the utu client is passed
 * @return {Function}   the middleware function for receiving mesage
 */
export default (utu) => (bot, message, next) => {
  // get utu's name for a given platform
  const platform = getUTUPlatformName(bot.type);

  // check if the botkit platform is supported by utu
  if (!platform) {
    console.error(`ERROR: uTu does not support currently platform of type ${bot.type}, please open a ticket at https://github.com/utu-ai/botkit-middleware`);
    return next();
  }

  // create a contextual instance of uTu
  const context = utu.withContext({
    platform,
    platformId: message.user,
  });

  // get the utu msg format and data for the given platform
  const values = getMessageDataForPlatform(platform, message, false);

  // attach a contextual version of the utu client to each message
  // so that the botmaker can then use the sdk with context to the user
  // their bot is communating with
  context.message({
    values,
  }).catch(e => console.error(`ERROR: UTU MESSAGE: ${e}`));

  // instrament each message to have utu within the scope of each incoming message
  Object.assign(message, { utu: context });

  return next();
};
