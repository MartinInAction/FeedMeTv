import React, {useState} from 'react'
import { searchSubtitle, searchQuote} from '../libs/ProcessHandler'
import ListComponent from './ListComponent'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  Pressable,
  TextInput
} from 'react-native'

const StartContainer = () => {
  let [movies, setMovies] = useState([])
  let [query, setQuery] = useState('')

  const onChangeText = (text: string) => setQuery(text)

  const searchMovie = () => {
    return searchQuote(query)
      .then(res => {
        return setMovies(res)
      })
      .catch(error => { })
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, styles.title]}>Welcome to FeedMeTV</Text>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} onChangeText={onChangeText} />
          <Pressable onPress={searchMovie} style={styles.button}>
            <Text style={styles.text}>
            Search
            </Text>
          </Pressable>
        </View>
        <ListComponent movies={movies} />
      </View>
    </View>
  )
}

const isNative = Platform.OS !== 'web'

const styles = StyleSheet.create({
  container: {
    overflow: 'auto',
    paddingTop: isNative ? 50 : 0,
    flexGrow: 1,
    height: isNative ? '100%' : '100vh',
    backgroundColor: 'black'
  },
  text: {
    color: 'white',
    textAlign: 'center'
  },
  title: {
    fontSize: 30,
    margin: 15
  },
  inputWrapper: {
    alignItems: 'center'
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 250,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'orange'
  },
  button: {
    justifyContent: 'center',
    width: 250,
    height: 50,
    backgroundColor: 'orange'
  }
})

export default StartContainer
