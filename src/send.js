import getUTUPlatformName from './botkit-utu-platform-matrix';

export default (utu) => (bot, message, next) => {
  // get utu's name for a given platform
  const platform = getUTUPlatformName(bot.type);

  // check if the botkit platform is supported by utu
  if (!platform) {
    console.error(`ERROR: uTu does not support currently platform of type ${bot.type}, please open a ticket at https://github.com/utu-ai/botkit-middleware`);
    return next();
  }

  utu.message({
    platform,
    platformId: message.channel,
    values: {
      message: message.text || '',
      rawMessage: message,
      botMessage: true,
    },
  }).catch(e => console.error(`ERROR: UTU MESSAGE: ${e}`));

  return next();
};
