import type { Metadata } from 'next'
import { Inter, PT_Sans } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const pt_sans = PT_Sans({ subsets: ['latin'], weight: "400" })

export const metadata: Metadata = {
  title: "Joeldzs",
  description: 'Portfolio website of Joel Dsouza, Data Scientist and a software engineer.',
  icons: [
    {
      rel: 'icon',
      sizes: '48x48',
      type: 'image/x-icon',
      url: '/assets/icon.ico',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={pt_sans.className}>
        <ThemeProvider defaultTheme="dark" attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

