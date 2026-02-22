import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stefan\'s Aufgaben Dashboard',
  description: 'Task Management für Pellendorf & Maishofen - Abfalltermine, Aufgaben und mehr',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}