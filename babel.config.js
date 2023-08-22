module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        alias: {
          '@/*': ['./app/*'],
          '~/*': ['./*'],
        },
      }],
      '@babel/plugin-proposal-export-namespace-from',

      // Required for expo-router
      'expo-router/babel',
    ],
  }
}
