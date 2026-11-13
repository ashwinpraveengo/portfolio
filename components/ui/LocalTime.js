import { useEffect, useState } from 'react'
import { portfolioConfig } from '@/data/portfolio.config'

export default function LocalTime({ seconds = false }) {
  const [time, setTime] = useState('')
  const { timezone, timezoneLabel } = portfolioConfig.personal

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      ...(seconds ? { second: '2-digit' } : {}),
      hour12: false,
    })
    const update = () => setTime(format.format(new Date()))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [timezone, seconds])

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {time || '--:--'} {timezoneLabel}
    </span>
  )
}
