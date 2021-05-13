/** @format */

import React from "react"
import Document, { Html, Head, Main, NextScript, DocumentInitialProps } from "next/document"
import { HTMLAttributes } from "react"
import { Helmet, HelmetData } from "react-helmet"
import ScriptTag from "react-script-tag"
import { withPrefix } from "../components/utils"

type Props = DocumentInitialProps & { helmet: HelmetData }

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return { ...initialProps, helmet: Helmet.renderStatic() }
  }

  // should render on <html>
  get helmetHtmlAttrComponents(): HTMLAttributes<HTMLElement> {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  // should render on <body>
  get helmetBodyAttrComponents(): HTMLAttributes<HTMLElement> {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  // should render on <head>
  get helmetHeadComponents(): HTMLAttributes<HTMLElement>[] {
    return Object.keys(this.props.helmet)
      .filter((el) => el !== "htmlAttributes" && el !== "bodyAttributes")
      .map((el) => this.props.helmet[el].toComponent())
  }

  render(): JSX.Element {
    return (
      <Html {...this.helmetHtmlAttrComponents}>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/uqo7fnf.css" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest"></link>
          {this.helmetHeadComponents}
        </Head>
        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <ScriptTag src={withPrefix("js/init.js")} />
          <ScriptTag src={withPrefix("js/page-load.js")} />
          <ScriptTag src={withPrefix("js/page-unload.js")} />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
