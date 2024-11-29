module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // Prettier integration
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // Custom rules if needed
  },
};
