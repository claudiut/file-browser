module.exports = {
    // Allows predefined globals for specific environments
    // (e.g.: for "Meteor" global to not be treated as an undefined variable add "meteor" env
    // should be added)
    env: {
        browser: true,
        es2020: true,
    },

    // Extends the rules with rules defined in specific plugins
    // "extends" is either a string that specifies a config file or setting,
    // OR an array of strings that extend the previous configs
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],

    // Helps ESLint determine parsing errors
    parser: '@typescript-eslint/parser',

    // Options that help ESLint to work with non-ES5 language features
    // All parsers receive the parserOptions
    parserOptions: {
        // Enables specific language features, like global return, global strict, or JSX
        ecmaFeatures: {
            jsx: true,
        },

        // Specifies which ECMAScript version you want to use
        ecmaVersion: 11,

        // Enables specific language features, like global return, global strict, or JSX
        sourceType: 'module',
    },

    // Specifies 3rd-party ESLint plugins installed via npm
    // (the "eslint-plugin-" prefix can be ommitted. Same applies to @scoped plugins)
    // ESlint will do a relative require: require('eslint-plugin-pluginname')
    plugins: [
        'react',
        '@typescript-eslint',
    ],

    // Extends (or overwrites) rules, specifying the [<severity>, <rule-options>].
    // Plugins can define their own rules.
    // A rule can be a string, which only extends the severity
    // without overwriting the whole rule (rule-options remain),
    // or can be an array, which will overwrite the rule.
    // Useful TS related rules: https://github.com/benmosher/eslint-plugin-import/issues/1573#issuecomment-566373069
    rules: {
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        // 'function-paren-newline': ['error', 'never'],
        indent: ['error', 4],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
                mjs: 'never',
            },
        ],
        // disable eslint unused vars rule and enable only the typescript rule
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
    },

    // pass specific settings to plugins
    settings: {
        'import/resolver': {
            node: {
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx',
                ],
            },
        },
    },
};
