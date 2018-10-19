// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = process.env.MODE === 'h5' ? {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
} : {
  "plugins": {
    "postcss-mpvue-wxss": {}
  }
}
