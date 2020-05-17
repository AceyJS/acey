import React from 'react'
import Acey from 'acey'
import { withAcey } from 'next-acey-wrapper'

const MyApp = props => {
  const { Component, pageProps } = props
  return <Component {...pageProps} />
}

export default withAcey(MyApp, Acey)