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
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.png', '.gif', '.jpg', '.jpeg', '.svg'],
                    moduleDirectory: ['node_modules', '.']
                },
                alias: {
                    map: [
                        ['@', '.']
                    ],
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.png', '.gif', '.jpg', '.jpeg', '.svg']
                }
            },
            'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.png', '.gif', '.jpg', '.jpeg', '.svg']
        },
        rules: {
            'import/no-unresolved': ['error', { ignore: ['\\.(png|gif|jpg|jpeg|svg)$'] }]
        }
    },
]);
