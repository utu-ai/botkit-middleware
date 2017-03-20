'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _platforms;

var _utu = require('utu');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var platforms = (_platforms = {}, _defineProperty(_platforms, _utu.constants.MESSENGER, function (message, botMessage) {
  return {
    message: message.text,
    rawMessage: {
      object: 'page',
      entry: [{
        time: message.timestamp,
        messaging: [{
          sender: {
            id: message.user
          },
          timestamp: message.timestamp,
          message: message.text
        }]
      }]
    },
    botMessage: botMessage
  };
}), _defineProperty(_platforms, _utu.constants.SLACK, function (message, botMessage) {
  return {
    message: message.text,
    rawMessage: message,
    botMessage: botMessage
  };
}), _defineProperty(_platforms, _utu.constants.ALEXA, function (message, botMessage) {
  return {
    message: message.alexa.getIntentName(),
    rawMessage: message.alexa,
    botMessage: botMessage
  };
}), _defineProperty(_platforms, 'default', function _default(message, botMessage) {
  return {
    message: message.text,
    rawMessage: message,
    botMessage: botMessage
  };
}), _platforms);

exports.default = function (platform, message, botMessage) {
  var cb = platforms[platform] || platforms.default;

  return cb(message, botMessage);
};