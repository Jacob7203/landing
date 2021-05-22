import * as React from "react"
import { ThemeProvider } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import getTheme from "./theme"

export function withRoot<P>(Component: React.ComponentType<P>) {
  function WithRoot(props: P) {
    const theme = getTheme("light")
    return (
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    )
  }

  return WithRoot
}
