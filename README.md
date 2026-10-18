# normuradov.com

Personal blog, built with [Eleventy](https://www.11ty.dev/) and hosted on Firebase Hosting.

```sh
npm install
npm start          # dev server on http://localhost:8080
npm run deploy     # clean build + firebase deploy
```

## Design system

Editorial theme: warm paper, ink, Samarkand turquoise and gold. All tokens are at the top of `css/index.css`.

### Fonts

Self-hosted from `fonts/` and declared in `css/fonts.css`, so no visitor data goes to Google Fonts. All are under the SIL Open Font License, with license files next to the fonts.

- Text and headings: Newsreader (variable, `opsz` + `wght`, roman and italic)
- UI and meta: Inter (variable `wght`)
- Code: JetBrains Mono (variable `wght`)

## Privacy and consent

- The cookie banner is [FreePrivacyPolicy.com Cookie Consent](https://www.freeprivacypolicy.com/free-cookie-consent/).
- Every third-party script must be consent-gated as `<script type="text/plain" cookie-consent="tracking|targeting|functionality">`. It runs only after the visitor accepts that level. Google Analytics is set up this way in `_includes/layouts/base.njk`.
- YouTube and the utterances comments are click-to-load (`.embed` + `data-load-embed`).
- Share buttons are plain links.
- Update `privacy/index.md` whenever you add a service that receives visitor data.

## Languages

Posts are written in English, Russian or German. Uzbek versions can be added as machine translations.

To add a translation:

1. Copy the post next to the original with a language suffix, e.g. `2022-08-31-ru.md`.
2. Set `lang: ru` and give both files the same `translationKey: <some-key>`.
3. For a generated translation, also set `machineTranslated: true`. Readers then see a notice with a link to the original.

Lists show each post once (the English version if there is one), with `EN · RU · DE` badges. Each post page links its other versions, and `hreflang` tags tell search engines they're translations. Interface labels and dates follow the post's `lang`; the strings are in `_data/i18n.js`.

## Images

Post images live in `img/`. During the build every `<img src="/img/…">` becomes a responsive `<picture>` with WebP and original-format versions in `_site/img/opt/`. Before adding a phone photo, strip its EXIF data, which may include GPS location.

Untouched originals of edited images are in `_originals/` (git-ignored).

## License

Code is MIT and content is © Farrukh Normuradov. See `LICENSE`.
