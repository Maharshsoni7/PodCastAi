import React from 'react'
import Navigation from './src/navigation/Navigation'
import { ApolloProvider } from '@apollo/client/react'
import { client } from './src/graphQL/client'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ApolloProvider client={client}>
        <Navigation />
      </ApolloProvider>
    </GestureHandlerRootView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
