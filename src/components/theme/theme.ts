import { createMuiTheme, responsiveFontSizes, Theme } from "@material-ui/core"
import { light, dark } from "./palette"

export { contentWidth } from "./contentWidth"
export type ThemeMode = "light" | "dark"

export const getTheme = (mode: ThemeMode): Theme =>
  responsiveFontSizes(
    createMuiTheme({
      palette: mode === "light" ? light : dark,
      typography: {
        fontFamily: "source-sans-pro"
      },
      zIndex: {
        appBar: 1200,
        drawer: 1100
      }
    })
  )

export default getTheme
