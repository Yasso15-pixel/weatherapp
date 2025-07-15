import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const city = req.query.city as string
  const apiKey = process.env.OPENWEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=9f89dd76df7d89d83b35e19ec8101247&units=metric`

  try {
    const response = await fetch(url)
    const data = await response.json()
    res.status(200).json(data)
  } catch {
    res.status(500).json({ error: 'Failed to fetch weather data' })
  }
}
