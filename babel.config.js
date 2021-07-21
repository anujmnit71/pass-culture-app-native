module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'macros',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        root: ['./src/'],
        alias: {
          api: './src/api',
          features: './src/features',
          libs: './src/libs',
          theme: './src/theme',
          locales: './src/locales',
          types: './src/types',
          tests: './src/tests',
          ui: './src/ui',
          __mocks__: './__mocks__',
        },
      },
    ],
  ],
}
