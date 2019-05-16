module.exports = {
    env: {
        es6: true,
        browser: true,
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    extends: [
        "eslint:recommended",
        "plugin:flowtype/recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "prettier/react",
    ],
    plugins: ["react", "react-hooks", "prettier"],
    rules: {
        "prettier/prettier": "warn",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
    },
};
