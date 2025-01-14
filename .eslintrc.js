module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "@react-native-community",
    "airbnb", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:import/typescript", // Enables imort of .tsx files
  ],
  plugins: ["react-hooks"],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "global-require": 0,
    "import/no-cycle": 0,
    "no-param-reassign": 0,
    "import/no-unresolved": ["error", { ignore: ["^@env$"] }],
    "no-nested-ternary": 0,
    "react/no-array-index-key": 0,
    // "jsx-props-no-spreading": 0,
    // '@typescript-eslint/indent': 'off',
    // 'react/prop-types': 'off',
    "react/require-default-props": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-module-boundar-types": "off",
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": "off",
    "react/style-prop-object": "off",
    "import/extensions": ["error", { tsx: "off" }],
    "prettier/prettier": [
      "error",
      {
        arrowParens: "always",
        semi: true,
        trailingComma: "all",
        tabWidth: 2,
        endOfLine: "auto",
        useTabs: false,
        singleQuote: false,
        printWidth: 120,
        jsxSingleQuote: false,
        proseWrap: "always",
      },
    ],
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  env: {
    jest: true,
    browser: true,
  },
};
