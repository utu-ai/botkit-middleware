'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utu = require('utu');

var _receive = require('./receive');

var _receive2 = _interopRequireDefault(_receive);

var _send = require('./send');

var _send2 = _interopRequireDefault(_send);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (secret, controller) {
  var utu = new _utu.uTu(secret);
  controller.middleware.receive.use((0, _receive2.default)(utu));
  controller.middleware.send.use((0, _send2.default)(utu));
};