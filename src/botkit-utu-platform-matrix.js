import { constants } from 'utu';

// maps botkits names to utu names
const matrix = {
  fb: constants.MESSENGER,
  slack: constants.SLACK,
  alexa: constants.ALEXA,
};

/**
 * Returns the platform name to use with utu
 * @param  {String} type this comes from bot.type, this is what botkit calls the platform
 * @return {String}      the utu platform name
 */
export default (type) => matrix[type];
