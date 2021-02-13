import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable
} from 'react-native'
import StartContainer from './components/StartContainer'

const App = () => {
  return (
    <View style={styles.scrollView}>
      <StatusBar barStyle={'dark-content'} />
      <StartContainer />
    </View>
  )
}

const styles = StyleSheet.create({})

export default App
