module.exports = {
    moduleNameMapper: {
      "^react-router-dom$": "<rootDir>/node_modules/react-router-dom",
    },
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest", // Ensure JSX files are transformed
    },
    moduleFileExtensions: ["js", "jsx", "json", "node"],
  };