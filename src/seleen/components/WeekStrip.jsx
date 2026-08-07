import { formatArabicDayNumber } from '../utils/date'

export default function WeekStrip({ days, dates, selectedKey, todayKey, onSelect }) {
  return (
    <nav className="week-strip" aria-label="أيام الأسبوع">
      {days.map((day, index) => {
        const selected = day.key === selectedKey
        const today = day.key === todayKey

        return (
          <button
            key={day.key}
            className={`day-button ${selected ? 'day-selected' : ''} ${today ? 'day-today' : ''}`}
            type="button"
            aria-pressed={selected}
            aria-label={`${day.label} ${formatArabicDayNumber(dates[index])}${today ? '، اليوم' : ''}`}
            onClick={() => onSelect(day.key)}
          >
            <span>{day.shortLabel}</span>
            <strong>{formatArabicDayNumber(dates[index])}</strong>
            {today && <i aria-hidden="true" />}
          </button>
        )
      })}
    </nav>
  )
}
