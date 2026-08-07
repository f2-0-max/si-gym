import seleenIdentity from '../../assets/seleen-identity.jpeg.asset.json'
import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react'
import { formatArabicDate, formatRiyadhTime, getRiyadhCalendarDate } from '../utils/date'

export default function EntryScreen({ now, workout, onEnter, isLeaving }) {
  const date = getRiyadhCalendarDate(now)
  const isRestDay = workout.exercises.length === 0

  return (
    <section className={`entry-screen screen-shell ${isLeaving ? 'screen-leaving' : ''}`} aria-labelledby="entry-title">
      <header className="entry-header">
        <div>
          <p className="brand-name">سـيّلين</p>
          <p className="brand-subtitle">جدول تمارينك الأسبوعي</p>
        </div>
        <div className="live-time" aria-label={`الوقت الآن ${formatRiyadhTime(now)}`}>
          <Clock3 aria-hidden="true" />
          <span>{formatRiyadhTime(now)}</span>
        </div>
      </header>

      <div className="hero-identity" aria-hidden="true">
        <div className="hero-frame">
          <img src={seleenIdentity.url} alt="" fetchPriority="high" />
        </div>
      </div>

      <div className="today-block">
        <div className="date-line">
          <CalendarDays aria-hidden="true" />
          <time dateTime={date.toISOString().slice(0, 10)}>{formatArabicDate(date)}</time>
        </div>

        <div className="ornament-line" aria-hidden="true"><span /></div>
        <p className="today-label">تمارين اليوم</p>
        <h1 id="entry-title">{workout.title}</h1>
        <p className="today-muscles">{workout.muscles}</p>

        <button className="primary-button entry-button" type="button" onClick={onEnter}>
          <span>{isRestDay ? 'عرض جدولي الأسبوعي' : 'دخول إلى جدولي'}</span>
          <ArrowLeft aria-hidden="true" />
        </button>
      </div>

      <div className="entry-footer-mark" aria-hidden="true">
        <span />
        <span className="leaf">◆</span>
        <span />
      </div>
    </section>
  )
}
