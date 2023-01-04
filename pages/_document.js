import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Productivity Machine" key="title"/>
        <meta property="og:description" content="built by Dylan" key="description"/>
        <meta
          property="og:image"
          content="https://imgur.com/a/pZurtUg"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
