import './globals.css'

export const metadata = {
  title: 'Gestión de Hoteles',
  description: 'Sistema de gestión hotelera',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-800 font-sans p-4">
        <main className="max-w-4xl mx-auto">{children}</main>
      </body>
    </html>
  )
}
