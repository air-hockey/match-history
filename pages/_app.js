import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import Head from 'next/head'
<<<<<<< refs/remotes/origin/master
import AuthProvider from '../lib/auth-provider'
import withApolloClient from '../lib/with-apollo-client'
=======
>>>>>>> WiP reworking PlayerList with semantic-ui

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return <Container>
        <Head>
          <title>United States Airhockey Association</title>
<<<<<<< refs/remotes/origin/master
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.css"
          />
=======
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.css" />
>>>>>>> WiP reworking PlayerList with semantic-ui
        </Head>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ApolloProvider>
      </Container>
  }
}

export default withApolloClient(MyApp)
