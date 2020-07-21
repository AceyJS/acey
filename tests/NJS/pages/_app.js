import React from 'react'
import _ from 'lodash'
import { manager, config } from 'acey'

export const withAcey = (App, Acey) => {
    const { manager, config } = Acey
    
    config.setEnvAsNextJS()
    config.done()
    const STORE_KEY = '_aceyStore'
  
    return class Wrap extends React.Component {
          
          constructor(props){
              super(props)
              if (!this.isServer()){
                const store = props.pageProps[STORE_KEY]
                for (const key in store)
                  _.isEqual(manager.models().node(key).to().plain(), store[key]) && delete store[key]
                manager.pendingHydrationStore().set(store)
              } 
          }
    
          static getInitialProps = async ({ Component, router, ctx }) => {
            let pageProps = {}

            if (!ctx) throw new Error('No page context');
            const prevInitialPropsFunction = Component.getInitialProps
                  
            if (Component.getInitialProps)
                pageProps = await Component.getInitialProps(ctx)
            
            Component.getInitialProps = (ctx) => pageProps
            Component.getInitialProps = prevInitialPropsFunction
  
            const ret = { 
                pageProps: { ...pageProps }
            }
            ret.pageProps[STORE_KEY] = manager.store().get()
            return ret
          }
    
          isServer = () => typeof window === 'undefined'
          
          getClearedProps = () => {
              let newProps = {}
              for (let key in this.props){
                  if (key === 'pageProps'){
                      const copy = _.cloneDeep(this.props[key])
                      delete copy[STORE_KEY]
                      copy['isServer'] = this.isServer()
                      newProps[key] = copy
                  } else {
                      newProps[key] = this.props[key]
                  }
              }
              return newProps
          }
          render = () => <App {...this.getClearedProps()} />
      }
}


const MyApp = props => {
  const { Component, pageProps } = props
  return (
    <Component {...pageProps} />
  )
}


export default withAcey(MyApp, {manager, config})