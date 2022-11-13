module.exports = {
    extends: ["handlebarlabs"], // we extend this config
    rules: {      // we overwrite theese rules
      "react/jsx-props-no-spreading": 0, // 0 = warning
      "react/jsx-curly-newline": 0,
      "react/style-prop-object": 0,
    },
  }