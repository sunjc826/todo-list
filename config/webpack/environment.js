const { environment } = require("@rails/webpacker");

const tsLoader = {
  test: /.(ts|tsx)$/,
  use: "ts-loader",
};

environment.loaders.append("typescript", tsLoader);

module.exports = environment;
