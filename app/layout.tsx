export const metadata = {
  title: 'Weather App',
  description: 'A simple weather checker',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
