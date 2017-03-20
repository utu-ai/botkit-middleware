'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _botkitUtuPlatformMatrix = require('./botkit-utu-platform-matrix');

var _botkitUtuPlatformMatrix2 = _interopRequireDefault(_botkitUtuPlatformMatrix);

var _getPlatformMessage = require('./get-platform-message');

var _getPlatformMessage2 = _interopRequireDefault(_getPlatformMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (utu) {
  return function (bot, message, next) {
    var platform = (0, _botkitUtuPlatformMatrix2.default)(bot.type);

    if (!platform) {
      console.error('ERROR: uTu does not support currently platform of type ' + bot.type + ', please open a ticket at https://github.com/utu-ai/botkit-middleware');
      return next();
    }

    var context = utu.withContext({
      platform: platform,
      platformId: message.user
    });

    var values = (0, _getPlatformMessage2.default)(platform, message, false);

    context.message({
      values: values
    }).catch(function (e) {
      return console.error('ERROR: UTU MESSAGE: ' + e);
    });

    Object.assign(message, { utu: context });

    return next();
  };
};