const tsPreset = require('ts-jest/presets/js-with-babel/jest-preset');
const cloudscapePreset = require('@cloudscape-design/jest-preset');

module.exports = Object.assign(tsPreset, cloudscapePreset);
