module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo',
              "jest",
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ],
            ],
    "env": {
      "production": {
        "plugins": ["transform-es2015-modules-commonjs"]
      }
    }
  };
};
