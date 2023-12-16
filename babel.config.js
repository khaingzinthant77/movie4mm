module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@appjson": "./app.json",
            "@images": "./assets/images",
            "@fonts": "./assets/fonts",
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@navigators": "./src/navigation",
            "@styles": "./src/styles",
            "@services": "./src/services",
            "@apis": "./src/apis",
          },
        },
      ],
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          safe: true,
          allowUndefined: true,
        },
      ],
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
