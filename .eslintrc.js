module.exports = {
  root: true,
  extends: ['@react-native-community'], // , 'react-app/jest'
  rules: {
    semi: ['error', 'never'],
    'comma-dangle': ['warn', 'never'],
    quotes: ['error', 'single', {avoidEscape: true}],
    curly: ['error', 'multi-line'],
    'prettier/prettier': 0,
    'indent': ['error', 2]
  }
}
