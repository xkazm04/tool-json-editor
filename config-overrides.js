const { useBabelRc, addBabelPlugin } = require("customize-cra");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  // addBabelPlugin("inline-react-svg")
  config.module.rules.push({ test: /\.inline.svg$/,
    use: ["@svgr/webpack"]})

  return config;
};
