module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // or 'babel-preset-expo' if using Expo
  plugins: [
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
  ],
};