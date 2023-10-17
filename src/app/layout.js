import './globals.css'
import { Rubik } from 'next/font/google'

const rubik = Rubik({ subsets: ['latin']})

export const metadata = {
  title: 'Letter Converter',
  description: 'Generate letter converter by NextJS and You can convert your letters...',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
      <div className='navbar'>
        <div className='container'>
          <p className='navbar-logo'>Converter</p>
        </div>
      </div>
        {children}
      </body>
    </html>
  )
}
