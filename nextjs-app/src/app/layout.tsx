import './globals.css'

export const metadata = {
  title: 'CyberGold SDK Demo',
  description: 'Demo app using CyberGold Solana SDK from my-solana-lib',
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
