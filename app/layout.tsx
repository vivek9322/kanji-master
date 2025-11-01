import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: 'JLPT N5 Kanji Flashcards',
  description: 'Learn Japanese JLPT N5 kanji with interactive flashcards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansJP.variable} antialiased`}>
        <Providers>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Navbar />
            <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-7xl">
              {children}
            </main>
            <Toaster 
              position="top-right"
              toastOptions={{
                className: 'dark:bg-gray-800 dark:text-white',
              }}
            />
          </div>
        </Providers>
      </body>
    </html>
  )
}

