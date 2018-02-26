module.exports = {
  extends: ["prettier"],
  plugins: ["prettier"],
  parserOptions: {
    sourceType: "module"
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    "prettier/prettier": "error"
  }
};
