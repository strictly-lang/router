const path = require("path");
const strictly = require("@strictly-lang/compiler")

module.exports = function (config) {
  config.set({
    basePath: ".",
    frameworks: ["jasmine"],
    browsers: ["ChromeHeadless", "FirefoxHeadless"],
    autoWatch: false,
    singleRun: true,
    files: [
      {
        pattern: "test/components/**/*.sly",
        type: "module",
        included: false,
      },
      {
        pattern: "test/**/*.js",
        type: "module",
      },
    ],
    exclude: [],
    preprocessors: {
      "**/*.sly": ["strictly"],
    },
    proxies: {
      "/test/": "/base/test/",
    },
    mime: {
      "text/javascript": ["sly"],
    },
    plugins: [
      {
        "preprocessor:strictly": [
          "factory",
          function () {
            const compiler = strictly({ cwd: __dirname, plugins: [path.join(__dirname, "src", "index.lua")] });

            return async (_, file) => {
              return compiler({
                filePath: file.originalPath
              });
            };
          },
        ],
      },
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-firefox-launcher",
    ],
  });
};
