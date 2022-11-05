import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <title>APIcally</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,200,0,0&display=swap"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;600;700;900&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#2D31FA" />
        <meta property="og:image" content="/img/how-to-third.png" />
        <meta property="og:url" content="https://apically.netlify.app" />
        <meta property="og:site_name" content="APIcally" />
        <meta property="og:title" content="APIcally" />
        <meta
          property="og:description"
          content="Where APIs get into work. A platform to run, host and visualize you API. Provide your algorithm, let us do the rest."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
