'use client'
import Head from 'next/head'
import { useState } from 'react'

type WeatherData = {
  main: {
    temp: number
  }
  weather: { main: string }[]
  name: string
  sys: {
    country: string
  }
  cod: number
  message?: string
}

export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)

  const API_KEY = '9f89dd76df7d89d83b35e19ec8101247' // 🔐 use .env later

  const fetchWeather = async () => {
    if (!city) return
    setLoading(true)

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      )

      const data: WeatherData = await res.json()
      console.log('Weather JSON:', data)

      if (data.cod === 200) {
        setWeather(data)
      } else {
        alert(data.message || 'City not found')
        setWeather(null)
      }
    } catch (err) {
      alert('Error fetching weather')
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 text-center">
          <h1 className="text-2xl font-semibold mb-4">Weather App</h1>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter city"
              className="flex-1 px-4 py-2 rounded-xl border"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              onClick={fetchWeather}
              className="bg-black text-white px-4 py-2 rounded-xl"
              disabled={loading}
            >
              {loading ? '...' : 'Search'}
            </button>
          </div>

          {weather && (
            <div className="rounded-3xl p-6 bg-gradient-to-br from-pink-100 to-white shadow-inner">
              <div className="text-6xl mb-2">
                {Math.round(weather.main.temp)}°
              </div>
              <div className="text-xl mb-1">{weather.weather[0].main}</div>
              <div className="text-4xl">📍</div>
              <p className="text-sm text-gray-600 mt-2">
                {weather.name}, {weather.sys.country}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

