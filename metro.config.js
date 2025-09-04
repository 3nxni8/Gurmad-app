const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
    '@': path.resolve(__dirname, 'app')
};

module.exports = config;
