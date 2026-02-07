import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { Platform } from 'react-native'
import { mmkvStorage } from '../state/storage'

const httpLink = new HttpLink({
  uri:
    Platform.OS === 'ios'
      ? 'http://localhost:3000/api/graphql'
      : 'http://10.0.2.2:3000/api/graphql',
})

const authLink = new ApolloLink((operation, forward) => {
  const token = mmkvStorage.getItem('token')

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }))

  return forward(operation)
})

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
})
