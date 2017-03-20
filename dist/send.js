'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _botkitUtuPlatformMatrix = require('./botkit-utu-platform-matrix');

var _botkitUtuPlatformMatrix2 = _interopRequireDefault(_botkitUtuPlatformMatrix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (utu) {
  return function (bot, message, next) {
    var platform = (0, _botkitUtuPlatformMatrix2.default)(bot.type);

    if (!platform) {
      console.error('ERROR: uTu does not support currently platform of type ' + bot.type + ', please open a ticket at https://github.com/utu-ai/botkit-middleware');
      return next();
    }

    utu.message({
      platform: platform,
      platformId: message.channel,
      values: {
        message: message.text || '',
        rawMessage: message,
        botMessage: true
      }
    }).catch(function (e) {
      return console.error('ERROR: UTU MESSAGE: ' + e);
    });

    return next();
  };
};