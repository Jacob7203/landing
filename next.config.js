/** @format */
require("dotenv").config()

const path = require("path")
const sourcebit = require("sourcebit")

const sourcebitConfig = require("./sourcebit.js")

sourcebit.fetch(sourcebitConfig)

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

const nextConfig = {
  future: { webpack5: true },
  trailingSlash: true,
  devIndicators: {
    autoPrerender: false
  },
  env: {
    DATOCMS_API_TOKEN: process.env.DATOCMS_API_TOKEN
  },
  sassOptions: {
    // scss files might import plain css files from the "public" folder:
    // @import "example.css";
    // the importer function rewrites path to these files relative to the scss file:
    // @import "../../public/assets/css/example.css";
    importer: (url, prev, done) => {
      if (/\.css$/i.test(url)) {
        return { file: path.join("../../public/css", url) }
      }
      return null
    }
  },
  webpack: (config, { webpack }) => {
    // Tell webpack to ignore watching content files in the content folder.
    // Otherwise webpack receompiles the app and refreshes the whole page.
    // Instead, the src/pages/[...slug].js uses the "withRemoteDataUpdates"
    // function to update the content on the page without refreshing the
    // whole page
    config.plugins.push(new webpack.WatchIgnorePlugin({ paths: [/\/content\//] }))
    return config
  }
}

const withImages = require("next-images")
module.exports = withBundleAnalyzer(withImages(nextConfig))
