module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'parserOptions': {
      'ecmaVersion': 6,
      'sourceType': 'module',
      'ecmaFeatures': {
        'jsx': true,
        'restParams': true
      }
    },
    'plugins': [
    ],
    'env': {
      'es6': true,
      'browser': true,
    },
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "import/no-named-as-default": 0,
      "jsx-a11y/anchor-is-valid": 0,
      "object-curly-newline": 0,
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/no-static-element-interactions": 0,
      "jsx-a11y/no-noninteractive-element-interactions": 0,
      "linebreak-style": 0,
      "max-len": ["error", { "code": 130 }],
    },
  };
  