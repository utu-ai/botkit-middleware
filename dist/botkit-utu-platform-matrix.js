'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utu = require('utu');

var matrix = {
  fb: _utu.constants.MESSENGER,
  slack: _utu.constants.SLACK,
  alexa: _utu.constants.ALEXA
};

exports.default = function (type) {
  return matrix[type];
};