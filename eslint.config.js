// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
    expoConfig,
    {
        ignores: ['dist/*'],
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.png', '.gif'],
                    moduleDirectory: ['node_modules', '.']
                },
                alias: {
                    map: [
                        ['@', './app']
                    ],
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.png', '.gif']
                }
            }
        }  // Added missing closing brace here
    },
]);
