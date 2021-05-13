import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import _ from "lodash"

import { withPrefix, attribute } from "./utils"
import Announcement from "./Announcement"
import Header from "./Header"
import Footer from "./Footer"
import { ThemeProvider } from "@material-ui/core/styles"
import { createMuiTheme, PaletteType, Paper, responsiveFontSizes } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import getTheme from "components/theme"

import AOS from "aos"
import { Layout } from "components"

const palette = {
  alternate: {
    main: "rgb(247, 249, 250)",
    dark: "#e8eaf6"
  },
  cardShadow: "rgba(23, 70, 161, .11)",
  type: "light" as PaletteType,
  primary: {
    main: "#215C94",
    light: "rgb(71, 145, 219)",
    dark: "rgb(17, 82, 147)",
    contrastText: "#fff"
  },
  secondary: {
    light: "#ffb74d",
    main: "#F2B705",
    dark: "#f57c00",
    contrastText: "rgba(0, 0, 0, 0.87)"
  },
  text: {
    primary: "#2d3748",
    secondary: "#718096"
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: "#fff",
    default: "#fff",
    level2: "#f5f5f5",
    level1: "#fff",
    footer: "#1b1642"
  }
}

const theme = responsiveFontSizes(
  createMuiTheme({
    palette,
    typography: {
      fontFamily: "source-sans-pro"
    },
    zIndex: {
      appBar: 1200,
      drawer: 1100
    }
  })
)

export type LayoutProps = Record<string, unknown>

export const Body: React.FC<LayoutProps> = (props) => {
  const style = _.get(props, "data.config.style", null) || "classic"
  const font = _.get(props, "data.config.base_font", null) || "sans-serif"
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }

    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: "ease-in-out"
    })
  }, [])

  return (
    <React.Fragment>
      <Helmet>
        <title>
          {_.get(props, "page.frontmatter.seo.title", null)
            ? _.get(props, "page.frontmatter.seo.title", null)
            : _.get(props, "page.frontmatter.title", null) +
              " | " +
              _.get(props, "data.config.title", null)}
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initialScale=1.0" />
        <meta name="google" content="notranslate" />
        <meta
          name="description"
          content={_.get(props, "page.frontmatter.seo.description", null) || ""}
        />
        {_.get(props, "page.frontmatter.seo.robots", null) && (
          <meta
            name="robots"
            content={_.join(_.get(props, "page.frontmatter.seo.robots", null), ",")}
          />
        )}
        {_.map(_.get(props, "page.frontmatter.seo.extra", null), (meta, meta_idx) => {
          const key_name = _.get(meta, "keyName", null) || "name"
          return _.get(meta, "relativeUrl", null) ? (
            _.get(props, "data.config.domain", null) &&
              (() => {
                const domain = _.trim(_.get(props, "data.config.domain", null), "/")
                const rel_url = withPrefix(_.get(meta, "value", null))
                const full_url = domain + rel_url
                return (
                  <meta
                    key={meta_idx}
                    {...attribute(key_name, _.get(meta, "name", null))}
                    content={full_url}
                  />
                )
              })()
          ) : (
            <meta
              key={meta_idx + ".1"}
              {...attribute(key_name, _.get(meta, "name", null))}
              content={_.get(meta, "value", null)}
            />
          )
        })}
        {style === "bold" ? (
          font === "serif" ? (
            <link
              href="https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&display=swap"
              rel="stylesheet"
            />
          ) : (
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap"
              rel="stylesheet"
            />
          )
        ) : style === "classic" ? (
          font === "serif" ? (
            <link
              href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap"
              rel="stylesheet"
            />
          ) : (
            <link
              href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,700;1,400;1,700&display=swap"
              rel="stylesheet"
            />
          )
        ) : font === "serif" ? (
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
        ) : (
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
        )}
        {_.get(props, "data.config.favicon", null) && (
          <link rel="icon" href={withPrefix(_.get(props, "data.config.favicon", null))} />
        )}
        <body
          className={
            "layout-" +
            _.get(props, "data.config.layout_type", null) +
            " style-" +
            _.get(props, "data.config.style", null) +
            " palette-" +
            _.get(props, "data.config.palette", null) +
            " mode-" +
            _.get(props, "data.config.mode", null) +
            " font-" +
            _.get(props, "data.config.base_font", null)
          }
        />
      </Helmet>
      <div id="site-wrap" className="site">
        {_.get(props, "data.config.header.has_anncmnt", null) &&
          _.get(props, "data.config.header.anncmnt_content", null) &&
          (_.get(props, "data.config.header.anncmnt_is_home_only", null) ? (
            _.get(props, "page.__metadata.urlPath", null) === "/" && (
              <Announcement {...props} site={props} />
            )
          ) : (
            <Announcement {...props} site={props} />
          ))}
        <Header {...props} />
        <main id="content" className="site-content">
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Paper elevation={0}>{props.children}</Paper>
          </ThemeProvider>
        </main>
        <Footer {...props} />
      </div>
      {(_.get(props, "data.config.header.has_primary_nav", null) ||
        _.get(props, "data.config.header.has_secondary_nav", null)) && (
        <div className="nav-overlay js-nav-toggle" />
      )}
    </React.Fragment>
  )
}

export default Body
