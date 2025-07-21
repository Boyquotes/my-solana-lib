import './globals.css'

export const metadata = {
  title: 'Solana Library Demo',
  description: 'Demo app using my-solana-lib',
}

export default function RootLayout({
  children,
}: {
  children: any
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
