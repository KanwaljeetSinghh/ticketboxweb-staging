import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Sora:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
            {/* <Script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbUkneRBKytPcvUfHPRDt-7WMz8urY5Eo&libraries=places&callback=initMap"></Script> */}
            <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCbUkneRBKytPcvUfHPRDt-7WMz8urY5Eo&libraries=places" strategy="beforeInteractive"></script>
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}