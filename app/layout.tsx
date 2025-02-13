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
      <body className={pt_sans.className}>
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

