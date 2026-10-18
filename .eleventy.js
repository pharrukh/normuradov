const fs = require("fs")
const path = require("path")
const Image = require("@11ty/eleventy-img")
const { IgnoredTagsForMainCollection } = require("./logic/constants")

const { DateTime } = require("luxon")
const markdownIt = require("markdown-it")
const markdownItAnchor = require("markdown-it-anchor")
const { sortPostItemsByDate } = require("./logic/api")
const site = require("./_data/site")

const pluginRss = require("@11ty/eleventy-plugin-rss")
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const pluginNavigation = require("@11ty/eleventy-navigation")

module.exports = function (eleventyConfig) {
  // Copy the `img` and `css` folders to the output
  eleventyConfig.addPassthroughCopy("img")
  eleventyConfig.addPassthroughCopy("js")
  eleventyConfig.addPassthroughCopy("css")
  eleventyConfig.addPassthroughCopy("fonts")
  eleventyConfig.addPassthroughCopy({ favicon: "/." })
  // Add plugins
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(pluginSyntaxHighlight)
  eleventyConfig.addPlugin(pluginNavigation)

  /**
   * Prefixes the given URL with the site's base URL.
   * @param {string} url
   */
  const toAbsoluteUrl = (url) => new URL(url, site.baseUrl).href
  eleventyConfig.addFilter("toAbsoluteUrl", toAbsoluteUrl)

  /** Given a local or remote image source, returns the absolute URL
   * to the image that will eventually get generated once the site is built.
   * @param {string} src The full path to the source image.
   * @param {null|number} width The width of the image whose URL we want to return.
   */
  const toAbsoluteImageUrl = async (src, width = null) => {
    const imageOptions = {
      // We only need the original width and format
      widths: [width],
      formats: [null],
      // Where the generated image files get saved
      outputDir: "_site/img",
      // Public URL path that's referenced in the img tag's src attribute
      urlPath: "/img",
    }
    const stats = await Image(src, imageOptions)
    const imageUrl = Object.values(stats)[0][0].url
    return toAbsoluteUrl(imageUrl)
  }

  eleventyConfig.addFilter("toAbsoluteImageUrl", toAbsoluteImageUrl)

  /**
   * Responsive images: every <img src="/img/….png|jpg"> in the built HTML is replaced
   * with a <picture> holding resized WebP + original-format versions (never upscaled),
   * with width/height set to avoid layout shift and lazy loading. Originals in /img stay
   * untouched, so the old URLs keep working.
   */
  const IMG_TAG = /<img\b([^>]*?)\bsrc="(\/img\/[^"]+\.(?:png|jpe?g))"([^>]*?)\/?>/gi
  const attr = (attrs, name) => {
    const m = attrs.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))
    return m ? m[1] : undefined
  }
  eleventyConfig.addTransform("responsive-images", async function (content) {
    if (!(this.page.outputPath || "").endsWith(".html") || !content.includes('src="/img/')) {
      return content
    }
    const tags = [...content.matchAll(IMG_TAG)]
    for (const [tag, before, src, after] of tags) {
      const file = path.join(__dirname, decodeURI(src))
      if (!fs.existsSync(file)) {
        console.warn(`[responsive-images] missing ${src} in ${this.page.inputPath}`)
        continue
      }
      const attrs = `${before} ${after}`
      const metadata = await Image(file, {
        widths: [480, 960, 1600],
        formats: ["webp", "auto"],
        outputDir: path.join(__dirname, "_site/img/opt/"),
        urlPath: "/img/opt/",
        sharpWebpOptions: { quality: 80 },
        sharpJpegOptions: { quality: 82, mozjpeg: true },
      })
      const html = Image.generateHTML(metadata, {
        alt: attr(attrs, "alt") || "",
        sizes: "(min-width: 44rem) 40rem, 100vw",
        loading: "lazy",
        decoding: "async",
        ...(attr(attrs, "style") ? { style: attr(attrs, "style") } : {}),
        ...(attr(attrs, "class") ? { class: attr(attrs, "class") } : {}),
      })
      content = content.replace(tag, html)
    }
    return content
  })

  // Text for a Cloudinary l_text overlay: commas and slashes must be double-encoded.
  eleventyConfig.addFilter("cloudinaryText", (text = "") =>
    encodeURIComponent(text).replace(/%2C/g, "%252C").replace(/%2F/g, "%252F")
  )

  eleventyConfig.addFilter("encode", (url) => {
    return encodeURI(url)
  })

  eleventyConfig.addFilter("readableDate", (dateObj, locale = "en") => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).setLocale(locale).toFormat("dd LLL yyyy")
  })

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd")
  })

  // Current year for the footer copyright (evaluated at build time).
  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear())

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return []
    }
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers)
  })

  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
    )
  }

  eleventyConfig.addFilter("filterTagList", filterTagList)

  /**
   * Translations: versions of one post share a `translationKey` in front matter.
   * `primaryOnly` keeps one entry per key (the English version, else the first),
   * so lists show each post once. `translationsOf` returns all versions of a key,
   * ordered as in _data/i18n.js.
   */
  const LANG_ORDER = require("./_data/i18n").order
  const langRank = (item) => {
    const i = LANG_ORDER.indexOf(item.data.lang || "en")
    return i === -1 ? LANG_ORDER.length : i
  }
  const primaryOnly = (items = []) => {
    const best = new Map()
    for (const item of items) {
      const key = item.data.translationKey
      if (!key) continue
      const cur = best.get(key)
      if (!cur || langRank(item) < langRank(cur)) best.set(key, item)
    }
    return items.filter((item) => !item.data.translationKey || best.get(item.data.translationKey) === item)
  }
  eleventyConfig.addFilter("primaryOnly", primaryOnly)
  eleventyConfig.addFilter("translationsOf", (all = [], key) =>
    key ? all.filter((item) => item.data.translationKey === key).sort((a, b) => langRank(a) - langRank(b)) : []
  )

  // Main posts (no endorsements), each translated post listed once.
  eleventyConfig.addCollection("allMyContent", (collectionApi) =>
    primaryOnly(collectionApi.getAll())
      .filter(function (item) {
        if (Array.isArray(item.data.tags)) {
          return !item.data.tags.some((tag) =>
            IgnoredTagsForMainCollection.includes(tag)
          )
        }

        return false
      })
      .sort(sortPostItemsByDate)
  )


  eleventyConfig.addCollection("endorsements", (api) =>
    primaryOnly(api.getFilteredByTag("endorsement"))
  )

  eleventyConfig.addCollection("essays", (api) =>
    api.getFilteredByTag("essay")
  )

  // Create an array of all tags
  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set()
    collection.getAll().forEach((item) => {
      ;(item.data.tags || []).forEach((tag) => tagSet.add(tag))
    })

    return filterTagList([...tagSet])
  })

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#",
    }),
    level: [1, 2, 3, 4],
    slugify: eleventyConfig.getFilter("slugify"),
  })
  eleventyConfig.setLibrary("md", markdownLibrary)

  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("_site/404.html")

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" })
          res.write(content_404)
          res.end()
        })
      },
    },
    ui: false,
    ghostMode: false,
  })

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html", "liquid"],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  }
}
