import Head from 'next/head';
import './globals.css'
import type { Metadata } from 'next'
import { ModelProvider } from '@/contexts/ModelContext'
import { StatusProvider } from '@/contexts/StatusContext'

export const metadata: Metadata = {
  title: 'flAI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <StatusProvider>
        <ModelProvider>
          <body>
            {children}
          </body>
        </ModelProvider>
      </StatusProvider>
    </html>
  )
}
