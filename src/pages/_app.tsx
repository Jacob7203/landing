// import App from 'next/app'
import React from "react"
import { useEffect } from "react"
import Router from "next/router"
import "../sass/main.scss"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { invoke } from "lodash"

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    invoke(window, "onNextjsAppDidMount")
    invoke(window, "onNextjsRouteChangeComplete")

    const handleRouteChangeStart = () => {
      invoke(window, "onNextjsRouteChangeStart")
    }

    const handleRouteChangeComplete = () => {
      invoke(window, "onNextjsRouteChangeComplete")
    }

    Router.events.on("routeChangeStart", handleRouteChangeStart)
    Router.events.on("routeChangeComplete", handleRouteChangeComplete)
    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart)
      Router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [])

  return <Component {...pageProps} />
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
