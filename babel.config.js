module.exports = {
  // https://github.com/facebook/create-react-app/blob/main/packages/babel-preset-react-app/create.js
  // babel-preset-react-app
  presets: ["react-app"],
  // presets: ["@babel/preset-env"],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ]
};