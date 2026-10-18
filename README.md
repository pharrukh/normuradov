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

## Images

Post images live in `img/`. During the build every `<img src="/img/…">` becomes a responsive `<picture>` with WebP and original-format versions in `_site/img/opt/`. Before adding a phone photo, strip its EXIF data, which may include GPS location.

Untouched originals of edited images are in `_originals/` (git-ignored).

## License

Code is MIT and content is © Farrukh Normuradov. See `LICENSE`.
