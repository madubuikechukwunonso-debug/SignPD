import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SignPro Enterprise',
  description: 'Document Management Platform',
}

export const dynamic = 'force-static'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/SignPD/favicon.ico" />
      </head>
      <body className={inter.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  )
}
