module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
          verbose: false
        },
      ],
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
