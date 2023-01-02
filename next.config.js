/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  env : {
    URL:"https://api.ticketboxonline.com/api/v1",
    key:"returnzIU"
  }
}


module.exports = nextConfig
