const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
    '@': path.resolve(__dirname, 'app'),
    '@assets': path.resolve(__dirname, 'assets')
};

module.exports = config;
