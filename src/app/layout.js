import { Inter } from 'next/font/google'
import './globals.sass'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EVNTS',
  description: 'Check out best crypto events',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} g-root`} style={{backgroundColor: "#000"}}>{children}</body>
    </html>
  )
}
