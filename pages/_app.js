import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import Head from 'next/head'
import AuthProvider from '../lib/auth-provider'
import withApolloClient from '../lib/with-apollo-client'

import '../styles/src/semantic.less'

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <Head>
          <title>United States Airhockey Association</title>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
