import { Html, Head, Main, NextScript } from 'next/document'

// Runs before first paint: applies the saved theme (no flash), flags JS for
// reveal styles, and starts every visit at the top for the intro sequence.
const bootScript = `(function(){var d=document.documentElement;try{d.dataset.theme=localStorage.getItem('portfolio-theme')==='light'?'light':'dark'}catch(e){d.dataset.theme='dark'}d.classList.add('js','is-loading');if('scrollRestoration' in history)history.scrollRestoration='manual'})();`

const fonts =
  'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@500..800&display=swap'

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fonts} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#05070d" />
        <noscript>
          <style>{`[data-preloader]{display:none!important}html.is-loading{overflow:auto!important}`}</style>
        </noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
